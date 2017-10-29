var http = require("http");
var express = require("express");
var fs = require("fs");

var app = express();


// app.get("/",
// (req, res, next) => {
//     console.log("Đã vào middleware");
//     next();
// },
// (req, res) => {
//     res.send("Xin chào các bạn!");
// })


app.use("/", (req, res, next) => {
    console.log("Đã vào middleware");
    //console.log(haha);
    next();
})


app.get("/",(req, res) => {
    res.send("Xin chào các bạn!");
})

app.all("/thu-nghiem", (req, res) => {
    res.send("Đã vào thử nghiệm!");
})

app.get("/ab?c", (req, res) => {
    res.send("thu nghiem xong ky tu ?");
})

app.get("/test(xem)?ne", (req, res) => {
    res.send("thu nghiem chuoi ky tu ?");
})

app.get("/lap-ky-tu-m+", (req, res) => {
    res.send("thử nghiệm lặp ký tự +");
})

app.get("/lap-ky-tu-(em)+", (req, res) => {
    res.send("thử nghiệm lặp chuỗi ký tự +");
})

app.get("/chuoi-*-ne", (req, res) => {
    res.send("thử nghiệm ký tự *");
});

app.get("/*.*", function(req, res){
    //console.log(req.url);
    fs.stat('./' + req.url, function(err, stat) {
        if(err == null) {
            //console.log('File exists');
            res.send(fs.readFileSync('./' + req.url));
        } else if(err.code == 'ENOENT') {
            // file does not exist
            console.log("file không tồn tại");
            res.send("file không tồn tại");
        } else {
            console.log('Bị lỗi: ', err.code);
            res.send('Bị lỗi: ', err.code);
        }
    });
});

app.get("/:id_loai_sp-:alias_loai_san_pham/:id_san_pham-:alias_san_pham", (req, res) => {
    res.send(req.params);
});

app.use((err, req, res, next) => {
    res.status(500);
    res.send("server error");

    //console.log(err);
});


app.use((req, res) => {
    res.send("Không tìm thấy trang");
})

var server = http.createServer(app);

server.listen(8000);