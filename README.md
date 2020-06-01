# DriveLight

Map Google Drive folder to static web path

Made with ExpressJs + GoogleApis

## API endpoints

| Path           | Description                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| /              | App Greetings + health check                                                                                                               |
| /gettoken      | Returns a drive.readonly token to access given folder                                                                                      |
| /:folder/:file | ✅ Returns the first instance of file with specified name under the specified parent folder name <br /> ❌ Returns error if file not found |

## Config (check .env.sample)

- Google Service account credentials
- Root Folder for all search query
- TeamDrive ID (if applicable)
