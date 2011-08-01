/**
* Copyright 2011 Facebook, Inc.
*
* You are hereby granted a non-exclusive, worldwide, royalty-free license to
* use, copy, modify, and distribute this software in source code or binary
* form for use in connection with the web services and APIs provided by
* Facebook.
*
* As with any software that integrates with the Facebook platform, your use
* of this software is subject to the Facebook Developer Principles and
* Policies [http://developers.facebook.com/policy/]. This copyright notice
* shall be included in all copies or substantial portions of the software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
* DEALINGS IN THE SOFTWARE.
*
*
*/

var fun = require("../../../uki-core/function"),
    utils = require("../../../uki-core/utils"),

    APIDataSource = require("./APIDataSource").APIDataSource;


var GraphAPIDataSource = fun.newClass(APIDataSource, {

    _callFBAPI: function(endpoint, data, callback) {
        FB.api(endpoint,
            utils.extend({ limit: this.maxResults(),
              type: data.type,
              q: data.query_string }, data),
            callback);
    },

    _preprocessResponse: function(response) {
        if (!response.accounts || !response.accounts.length) {
            response.accounts = [];
        }
        return response.accounts.map(function(x) {
            return {id: x.id, text: x.name, subtext: x.id};
        });
    }

});


exports.GraphAPIDataSource = GraphAPIDataSource;
