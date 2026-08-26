# Tanstack Start - devops-template-react

https://github.com/Aibel365/devops-template-react

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
