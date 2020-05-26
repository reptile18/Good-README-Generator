function generateMarkdown(data) {
  return `
# ${data.title} ![GitHub release](https://img.shields.io/badge/version-${data.version}-informational) 

${data.description}

#### Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [License](#license)
4. [Contributing](#contributing)
5. [Tests](#tests)
6. [Questions](#questions)

## Installation

${data.installation}

## Usage

${data.usage}

## License 

${data.license}

## Contributing

${data.contributing}

## Tests

${data.tests}

## Questions

![author](${data.avatar_url})
![email icon](https://fontawesome.com/bda285c6-bd10-442c-8af4-146d8d51097f) ${data.email}
![Github email](https://img.shields.io/badge/email-${data.email}-informational)

`;
}

module.exports = generateMarkdown;

