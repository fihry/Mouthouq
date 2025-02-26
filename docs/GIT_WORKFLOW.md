# Git Architecture & Workflow Management

## Branch Strategy

### Main Branches
- `main` - Production-ready code
- `develop` - Integration branch for features
- `staging` - Pre-production testing

### Feature Development
- Branch naming: `feature/[issue-number]-brief-description`
- Example: `feature/123-add-user-authentication`

### Hotfixes
- Branch naming: `hotfix/[issue-number]-brief-description`
- Example: `hotfix/456-fix-login-bug`

### Release Branches
- Branch naming: `release/v[version-number]`
- Example: `release/v1.2.0`

## Commit Convention

```bash
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding/modifying tests
- `chore`: Maintenance tasks

### Example
```bash
feat(auth): implement JWT authentication

- Add JWT token generation
- Implement token validation middleware
- Create refresh token endpoint

Closes #123
```

## Workflow Steps

1. **Create Feature Branch**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/123-add-user-authentication
```

2. **Regular Commits**
```bash
git add .
git commit -m "feat(auth): implement JWT authentication"
```

3. **Push Changes**
```bash
git push origin feature/123-add-user-authentication
```

4. **Create Pull Request**
- Source: `feature/123-add-user-authentication`
- Target: `develop`
- Include issue references
- Add reviewers

5. **Merge Process**
- Code review approval required
- All tests must pass
- No conflicts with target branch
- Squash and merge

## Protection Rules

### Branch Protection
- `main`: Requires pull request and approvals
- `develop`: Requires pull request and one approval
- `staging`: Requires pull request

### Required Status Checks
- Unit tests
- Integration tests
- Linting
- Build verification

## Release Process

1. Create release branch
```bash
git checkout develop
git checkout -b release/v1.2.0
```

2. Version bump and final testing

3. Merge to main and tag
```bash
git tag -a v1.2.0 -m "Version 1.2.0"
git push origin v1.2.0
```

4. Merge back to develop
```bash
git checkout develop
git merge release/v1.2.0
```

## Best Practices

- Keep commits atomic and focused
- Write meaningful commit messages
- Regular rebasing with develop
- Delete branches after merging
- Use issues for tracking work
- Link commits to issues