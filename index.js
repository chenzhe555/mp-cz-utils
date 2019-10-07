'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var defaultAPIs = ['showToast'];

/**
 * 将微信中的API转换成Promise实现
 * @param {array}} funcs WX的API数组
 */
function wxAPIPromise() {
    var funcs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultAPIs;

    var obj = {};
    // wx存在并且 APIs是数组
    if (typeof wx !== 'undefined' && Array.isArray(funcs)) {
        funcs.forEach(function (item) {
            // 如果存在该方法
            if (wx[item] && typeof wx[item] === 'function') {
                obj[item] = function () {
                    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    return new Promise(function (resolve, reject) {
                        params['success'] = resolve;
                        params['fail'] = reject;
                        wx[item](params);
                    });
                };
            }
        });
    }
    return obj;
}

function test() {
    console.log('wxAPIPromise-test');
}

exports.default = {
    wxAPIPromise: wxAPIPromise,
    test: test
};