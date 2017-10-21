exports.camelCase = (str) => {
    // str = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
    //     return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    // });
    str = str.toLowerCase();
    str = str.replace(/\s\w/g, (letter) => {
        return ` ${letter.toUpperCase()}`;
    });
    str = str.replace(/\s+/g, '');

    return str;
}

exports.boDauTiengViet = (str) => {
    var in_chrs  = 'àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ';
    in_chrs     += 'ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ';
    var out_chrs = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd';
    out_chrs    += 'AAAAAAAAAAAAAAAAAEEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOOOUUUUUUUUUUUYYYYYD';

    var transl = {};
    for (var i=0; i<in_chrs.length; i++) {
        transl[in_chrs[i]] = out_chrs[i];
    }

    var chars_rgx = new RegExp(`[${in_chrs}]`, 'g');
    var lookup = (m) => {
        return transl[m] || m;
    }
    str = str.replace(chars_rgx, lookup);

    return str;
}

exports.friendUrl = (str) => {
    str = this.boDauTiengViet(str);
    str = str.toLowerCase();
    str = str.replace(/[^a-z0-9]/g, '-');
    str = str.replace(/-+/g, '-');
    str = str.replace(/^-*|-*$/g, '');

    return str;
}