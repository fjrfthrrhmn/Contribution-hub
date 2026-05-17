export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			["feat", "fix", "refactor", "docs", "chore", "style", "test", "perf"]
		],
		"scope-empty": [2, "never"]
	}
}
