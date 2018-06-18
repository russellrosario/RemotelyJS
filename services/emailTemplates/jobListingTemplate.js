const keys = require('../../config/keys')

module.exports = jobListing => {
  return `
    <html>
      <body>
        <div style="text-align: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question:</p>
          <p>${jobListing.body}</p>
          <div>
            <a href="${keys.redirectDomain}/api/jobListings/${jobListing.id}/yes">Yes</a>
          </div>
          <div>
            <a href="${keys.redirectDomain}/api/jobListings/${jobListing.id}/no">No</a>
          </div>
        </div>
      </body>
    </html>
  `
}
