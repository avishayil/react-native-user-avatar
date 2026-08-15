# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 2.x     | ✅ |
| < 2.0   | ❌ |

Only the latest 2.x release receives security fixes. Please upgrade to the latest
version before reporting an issue.

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

- Preferred: report privately via GitHub Security Advisories —
  [Report a vulnerability](https://github.com/avishayil/react-native-user-avatar/security/advisories/new).
- Alternatively, email **avishay.il@gmail.com** with details and reproduction steps.

You can expect:

- An acknowledgement within **5 business days**.
- An initial assessment within **10 business days**.
- Coordinated disclosure once a fix is available.

## Scope

`react-native-user-avatar` is a pure-JavaScript React Native component with a single
runtime dependency (`initials`). Relevant areas include:

- **In scope**: the component's handling of the `src` URL and the network request it
  makes to validate the image, and any dependency vulnerabilities.
- **Out of scope**: vulnerabilities in React Native, Expo, or your application code;
  issues that require a malicious `bgColors`/`component` value supplied by the app itself.
