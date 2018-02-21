module.exports = {
	NODE_ENV: '"production"',
  
  /**
	 * 
	 * Track teamcity buildnumber on release builds.
	 * This is passed in via npm script as an argument
	 * 
	 */
  teamcitybuildnumber: `"${process.env.npm_config_teamcitybuildnumber}"`	
}
