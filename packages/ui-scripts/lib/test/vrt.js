/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 - present Instructure, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
require('dotenv').config()

const path = require('path')
const { runCommandsConcurrently, getCommand } = require('@instructure/command-utils')

const rootPath = path.resolve(process.cwd(), '../../node_modules')

let result

// ui-build --vrt -p 8080
const args = process.argv.slice(2)
const portIndex = args.findIndex(arg => arg === '-p')
let port = '9001'
if (portIndex > 0) {
  port = args[portIndex + 1]

}

result = runCommandsConcurrently({
  chromatic: getCommand('chromatic', ['test', '--storybook-port', port, '--no-interactive', '--exit-zero-on-changes'], [`CHROMATIC_APP_CODE=${process.env.CHROMATIC_APP_CODE}`])
})

process.exit(result.status)
