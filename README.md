# Tanstack Start - devops-template-react

https://github.com/Aibel365/devops-template-react

## Prerequisites: GitHub access token

Packages under the `@aibel365` scope are hosted on the private GitHub Packages registry. The [.npmrc](.npmrc) reads the token from the `NODE_AUTH_TOKEN` environment variable, so it must be set before running `npm install`.

### 1. Create a Personal Access Token (classic)

1. Go to https://github.com/settings/tokens and choose **Generate new token (classic)**.
2. Give it a descriptive note (e.g. `npm.pkg.github.com`) and an expiration.
3. Select the `read:packages` scope (add `write:packages` only if you need to publish).
4. Generate the token and copy it - it is only shown once.
5. On the token list, use **Configure SSO** and authorize the token for the `Aibel365` organization.

### 2. Set it as a Windows environment variable

Using PowerShell (user-level, no admin required):

```powershell
[Environment]::SetEnvironmentVariable('NODE_AUTH_TOKEN', '<your-token>', 'User')
```

Or through the UI: **Start** -> _Edit the system environment variables_ -> **Environment Variables...** -> **New...** under _User variables_, with name `NODE_AUTH_TOKEN` and your token as the value.

Restart your terminal (and VS Code) so the new variable is picked up, then verify:

```powershell
$env:NODE_AUTH_TOKEN
```

Treat the token like a password: never commit it or paste it into `.npmrc`.

## Creating a new app from the template

Use the TanStack CLI with the published [template.json](templates/devops/template.json) to scaffold a new application.

```bash
npx @tanstack/cli@latest create --template https://raw.githubusercontent.com/Aibel365/devops-template-react/refs/heads/main/templates/devops/template.json my-app
```

Add `--non-interactive` to skip the prompts, and pass `.` instead of a name to scaffold into the current directory.

Then install and run:

```bash
cd my-app
npm install
npm run dev
```

The app is served on http://localhost:3000.

To pull in later template changes, run `npm run update` inside the generated app.

## Getting Started

This package uses workspaces for each [template](https://github.com/Aibel365/devops-template-react/templates/).

```bash
npm install
npm run knip
npm run release

npm run build --workspaces # Runs build in each workspace
npm run compile --workspaces # Runs compile in each workspace
npm run docker:build --workspaces # Runs docker:build in each workspace

```

## Development

When adding, updating or removing any files in the template you must also compile the template to make the changes available.
When adding, updating or removing any dependencies or scripts in the template `package.json` you must also update the corresponding sections in `starter-info.json` and `template-info.json` before compiling the template.

```bash
npm run compile --workspaces
```
