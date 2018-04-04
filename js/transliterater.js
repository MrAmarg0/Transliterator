define(
    [],
    function(){
        var transliterater = {};

        transliterater.initLibs = function () {
            var self = this;
            this["protocols"] = [];
            loadRuEn(this);
        };

        transliterater.getTranslitVars = function(inLang, outLang, inStr, isUniq) {
            var result = [];
            var validProtocols = this["protocols"].filter(function(protocol){
                if (protocol.inLang == inLang && protocol.outLang == outLang) {
                    return true;
                }
                return false;
            });
            for (var i = 0; i < validProtocols.length; i++) {
                var protocolResults = validProtocols[i].transliterate(inStr);
                result = result.concat(protocolResults);
            }
            return result;
        }

        function Protocol(enName, originalName, inLang, outLang, transliterate, reverseTransliterate) {
            this.enName = enName;
            this.originalName = originalName;
            this.inLang = inLang;
            this.outLang = outLang;
            this.transliterate = transliterate;
            this.reverseTransliterate = reverseTransliterate;
        }

        var loadRuEn = function(transliterater) {
            var ru = "ru",
                en = "en";
            transliterater["protocols"].push(new Protocol(
                "GOST 7.79-2000",
                "ГОСТ 7.79-2000",
                ru,
                en,
                function (inStr) {
                    var uniqChars = {
                        'а': "a",
                        'б': "b",
                        'в': "v",
                        'г': "g",
                        'д': "d",
                        'е': "e",
                        'ё': "yo",
                        'ж': "zh",
                        'з': "z",
                        'й': "j",
                        'к': "k",
                        'л': "l",
                        'м': "m",
                        'н': "n",
                        'о': "о",
                        'п': "p",
                        'р': "r",
                        'с': "s",
                        'т': "t",
                        'у': "u",
                        'ф': "f",
                        'х': "x",
                        'ч': "ch",
                        'ш': "sh",
                        'щ': "shh",
                        'ъ': "``",
                        'ы': "y'",
                        'ь': "`",
                        'э': "e`",
                        'ю': "yu",
                        'я': "ya",
                        '\'': "'"
                    }
                    var varChars = {
                        'и': ["i", "i'"],
                        'ц': ["cz", "c"]
                    }
                    return utils.getUniqVar(uniqChars, varChars, inStr);
                })
            ), function(){};
            transliterater["protocols"].push(new Protocol(
                "ISO 9 - 1995",
                "ISO 9 - 1995",
                ru,
                en,
                function(inStr) {
                    var outStr = [""];
                    var uniqChars = {
                        'а' : 'а',
                        'б' : 'b',
                        'в' : 'v',
                        'г' : 'g',
                        'д' : 'd',
                        'е' : 'e',
                        'ё' : 'ё',
                        'ж' : 'ž',
                        'з' : 'z',
                        'и' : 'i',
                        'й' : 'j',
                        'к' : 'k',
                        'л' : 'l',
                        'м' : 'm',
                        'н' : 'n',
                        'о' : 'o',
                        'п' : 'p',
                        'р' : 'r',
                        'с' : 's',
                        'т' : 't',
                        'у' : 'u',
                        'ф' : 'f',
                        'х' : 'h',
                        'ц' : 'c',
                        'ч' : 'č',
                        'ш' : 'š',
                        'щ' : 'ŝ',
                        'ъ' : '\"',
                        'ы' : 'y',
                        'ь' : '\'',
                        'э' : 'è',
                        'ю' : 'û',
                        'я' : 'â'
                    }
                    utils.getUniqVar(uniqChars, null, inStr);
                    return outStr;
                }),
                function(){}
            );
            transliterater["protocols"].push(new Protocol(
                "GOST 16876-71 (with diacritical marks)",
                "ГОСТ 16876-71 (с диакритическими знаками)",
                ru,
                en,
                function(inStr) {
                    var uniqChars = {
                        'а' : 'a',
                        'б' : 'b',
                        'в' : 'v',
                        'г' : 'g',
                        'д' : 'd',
                        'ё' : 'ё',
                        'ж' : 'ž',
                        'з' : 'z',
                        'и' : 'i',
                        'й' : 'j',
                        'к' : 'k',
                        'л' : 'l',
                        'м' : 'm',
                        'н' : 'n',
                        'о' : 'о',
                        'п' : 'p',
                        'р' : 'r',
                        'с' : 's',
                        'т' : 't',
                        'у' : 'u',
                        'ф' : 'f',
                        'ц' : 'c',
                        'ч' : 'č',
                        'ш' : 'š',
                        'ъ' : '\"',
                        'ы' : 'y',
                        'ь' : '\'',
                        'э' : 'è'
                    }
                    var varChars = {
                        'е' : ["e", "je'"],
                        'х' : ["h", "ch"],
                        'щ' : ["ŝ", "šč"],
                        'ю' : ["û", "ju"],
                        'я' : ["â", "ja"]
                    }
                    return utils.getUniqVar(uniqChars, varChars, inStr);
                },
                function(){}
            ));
            transliterater["protocols"].push(new Protocol(
                "GOST 16876-71 (with latin)",
                "ГОСТ 16876-71 (с латиницей)",
                ru,
                en,
                function(inStr) {
                    var uniqChars = {
                        'а' : 'a',
                        'б' : 'b',
                        'в' : 'v',
                        'г' : 'g',
                        'д' : 'd',
                        'е' : 'e',
                        'ё' : 'jo',
                        'ж' : 'zh',
                        'з' : 'z',
                        'и' : 'i',
                        'й' : 'jj',
                        'к' : 'k',
                        'л' : 'l',
                        'м' : 'm',
                        'н' : 'n',
                        'о' : 'o',
                        'п' : 'p',
                        'р' : 'r',
                        'с' : 's',
                        'т' : 't',
                        'у' : 'u',
                        'ф' : 'f',
                        'х' : 'kh',
                        'ц' : 'c',
                        'ч' : 'ch',
                        'ш' : 'sh',
                        'щ' : 'shh',
                        'ъ' : '\"',
                        'ы' : 'y',
                        'ь' : '\'',
                        'э' : 'eh',
                        'ю' : 'ju',
                        'я' : 'ja'
                    }
                    return utils.getUniqVar(uniqChars, null, inStr)
                },
                function(){}
            ));
        }
        var utils = {};
        utils.getUniqVar = function(uniqChars, varChars, inStr) {
            var outStr = [""];
            for (var i = 0; i < inStr.length; i++) {
                var cur = inStr[i].toLowerCase().charAt(0),
                    isCapit,
                    newChar;
                if (inStr[i].toLowerCase() == inStr[i]) {
                    isCapit = false;
                } else {
                    isCapit = true;
                }
                var uniqChar = uniqChars[cur];
                if (uniqChar !== undefined) {
                    newChar = isCapit === true ? uniqChar.toUpperCase() : uniqChar;
                    for (var j = 0; j < outStr.length; j++) {
                        outStr[j] += newChar;
                    }
                } else if (varChars !== undefined && varChars !== null && varChars[cur] !== undefined) {
                    var vars = varChars[cur];
                    var curCount = outStr.length;
                    for (var j = 0; j < curCount; j++) {
                        newChar = isCapit === true ? vars[0].toUpperCase() : vars[0];
                        var oldStr = outStr[j];
                        outStr[j] += newChar;
                        for (var k = 1; k < vars.length; k++) {
                            newChar = isCapit === true ? vars[k].toUpperCase() : vars[k];
                            outStr.push(oldStr + vars[k]);
                        }
                    }
                } else {
                    for (var j = 0; j < outStr.length; j++) {
                        outStr[j] += isCapit === true ? cur.toUpperCase() : cur;
                    }
                }
            }
            return outStr;
        };
        return transliterater;
    }
);