# Contributing to React Native User Avatar

Thanks for your interest in contributing! This project is maintained in the open on
GitHub. For a full picture of the architecture and commands, see [CLAUDE.md](./CLAUDE.md).

## Development workflow

1. Fork the repo and create your branch from `master`
   (see [how to fork a repository](https://help.github.com/articles/fork-a-repo/)).
2. Run `npm run bootstrap` to install dependencies for the library and the example app.
3. Make your changes and verify them in the [`Example/`](./Example) app before opening a
   pull request.

## Commit message convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/en) specification:

- `fix`: bug fixes, e.g. fixed the custom component rendering.
- `feat`: new features, e.g. added a prop or capability.
- `refactor`: code refactor with no behavior change.
- `docs`: documentation changes.
- `test`: adding or updating tests.
- `chore`: tooling changes, e.g. CI configuration.
- `BREAKING CHANGE`: changes that break existing usage.

The `commit-msg` git hook verifies your commit message matches this format.

## Linting and tests

We use `typescript` for type-checking, `eslint` for linting/formatting, and `jest` for
tests. The `pre-commit` hook runs all three. You can also run them manually:

- `npm run typescript` — type-check with `tsc`.
- `npm run lint` — lint with `eslint`.
- `npm test` — run tests with `jest` and refresh coverage badges.

## Sending a pull request

- Prefer small pull requests focused on a single change.
- Make sure `typescript`, `lint`, and all tests pass.
- Add or update tests for behavior changes.
- Update the `README.md` props table when you add or change a prop.
- Follow the pull request template.

## Running the example

The example app uses [Expo](https://expo.dev/). From the repo root:

```sh
npm run example start
```

Then open it on a device/simulator via the Expo Go app, or press `w` to run in the browser.

## Reporting issues

Report issues on the [bug tracker](https://github.com/avishayil/react-native-user-avatar/issues)
using the issue templates.

## License

By contributing, you agree that your contributions will be licensed under the project's
**MIT** license.
