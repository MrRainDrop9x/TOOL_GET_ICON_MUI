const fs = require('fs')
const util = require('util')

const readdir = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

const readFiles = async dirname => {
  try {
    const filenames = await readdir(dirname)
    console.log(filenames)
    const files_promise = filenames.map(filename => {
      return readFile(dirname + filename, 'utf-8')
    })

    const response = await Promise.all(files_promise)
    //console.log({ response })
    //return response
    return filenames.reduce((accumlater, filename, currentIndex) => {
      const content = response[currentIndex]
      let a = {
        IconName: filename.split('.')[0],
        Category: '1',
        Content: content,
      }
      accumlater.push(a)
      return accumlater
    }, [])
  } catch (error) {
    console.error(error)
  }
}

const main = async () => {
  const response = await readFiles('./svg/round/')
  setTimeout(() => {
    fs.writeFileSync('./data.js', JSON.stringify(response, null, 2), 'utf-8')
  }, 2000)
}

main()
