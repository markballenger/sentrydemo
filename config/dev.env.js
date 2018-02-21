var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var branch = require('git-branch')

/**
 * 
 * Track branch name for sentry.io 
 * when in development
 * 
 */
var branchName = '' 
try { 
	branchName = branch.sync()
} catch(e){
	// pass
}

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	git_branch: `"${branchName}"`,
  
  /**
   * 
   * Track teamcity buildnumber
   * 
   */
  teamcitybuildnumber: `"${process.env.npm_config_teamcitybuildnumber}"`
})
