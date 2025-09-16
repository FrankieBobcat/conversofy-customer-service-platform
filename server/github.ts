import { Octokit } from '@octokit/rest'

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

// WARNING: Never cache this client.
// Access tokens expire, so a new client must be created each time.
// Always call this function again to get a fresh client.
export async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

export async function createGitHubRepository(name: string, description: string, isPrivate: boolean = false) {
  try {
    const octokit = await getUncachableGitHubClient();
    
    const response = await octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private: isPrivate,
      auto_init: true,
    });

    return {
      success: true,
      repository: response.data,
      url: response.data.html_url,
      cloneUrl: response.data.clone_url,
    };
  } catch (error) {
    console.error('Error creating GitHub repository:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function uploadFilesToRepository(
  owner: string,
  repo: string,
  files: Array<{ path: string; content: string; message?: string }>
) {
  try {
    const octokit = await getUncachableGitHubClient();
    const results = [];

    for (const file of files) {
      try {
        // Check if file exists
        let sha: string | undefined;
        try {
          const existingFile = await octokit.repos.getContent({
            owner,
            repo,
            path: file.path,
          });
          if ('sha' in existingFile.data) {
            sha = existingFile.data.sha;
          }
        } catch (error) {
          // File doesn't exist, which is fine for new files
        }

        const response = await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: file.path,
          message: file.message || `Add ${file.path}`,
          content: Buffer.from(file.content).toString('base64'),
          sha,
        });

        results.push({
          path: file.path,
          success: true,
          url: response.data.content?.html_url,
        });
      } catch (error) {
        results.push({
          path: file.path,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      success: true,
      results,
    };
  } catch (error) {
    console.error('Error uploading files to repository:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}