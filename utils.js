const express = require('express');

exports.createServer =() => {
	const app = express()
    const port = process.env.PORT || 3000

    app.use(express.urlencoded({ extended: false }))

	app.use(express.json())
    app.listen(port, () => {
        console.log(` app listening on port ${port}`)
      })
      
	return app
}
