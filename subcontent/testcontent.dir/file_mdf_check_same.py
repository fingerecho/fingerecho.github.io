<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="fingerecho,fangself.com.cn,">
    
    <link rel="icon" href="./jpg/icon/favicon.gif">

    <title>title</title>

    <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/4.1.0/css/bootstrap.min.css">
    <style type="text/css">
      html,body,p,br{margin: 0px;padding: 0px;}
      body{
        background: #E7EAE3;
      }
      .main{
/*        border: 1px red solid;
*/        padding-top: 5%;
        padding-bottom: 20%;
        background: #fff;
      }
      .sidebar{
/*        border: 1px black solid;
*/        display: none;

      }
      @media (min-width: 768px) {
        .sidebar{
          /*border: 3px green solid;
          */display: block;
          text-align: center;
        }
      }
      span,p{
        text-align: left;
        margin-left: 10px;
        font-size: 18px;
        font-family: Palatino, "Palatino Linotype",SimSun;
      }
      a{
        color: #000;
      }
      a:hover{
        text-decoration: none;
        color:#f40;
        font-size: 18px;
      }
      h1,h2,h3{
        text-align: center;
        font-family: Palatino, "Palatino Linotype",SimSun;
      }

      h2,h3{
        margin-top:30px;
      }
      hr{
        width:50%;
        border-left:1px solid black;
        font-family: Palatino, "Palatino Linotype", SimSun;
      }
      .pcent{
        text-align:center;
      }
    </style>

   </head>
   <body>
    <div class="container">
      <div class="row">
        <div class="col-md-2 sidebar">
          <iframe src="./leftnav.htm" height="100%" width="100%" scrolling="no" frameborder="0"></iframe>
        </div>
        <div class="col-md-10 main" >
          <iframe id="main-content-iframe" src="file_mdf_check_same.py" height="100%" width="100%" scrolling="no" frameborder="0"></iframe>
        </div>
      </div>  
    </div>
    <footer class="container-fluid foot-wrap">
       <iframe src="./bottomfooter.htm" height="100%" width="100%" scrolling="no" frameborder="0"></iframe>
    </footer>
    <script type="text/javascript">
      var setIframe = function(id) {
      var Iframe = document.getElementById(id);
        try {
          // 声明变量取值
          var bHeight = Iframe.contentWindow.document.body.scrollHeight;
          var dHeight = Iframe.contentWindow.document.documentElement.scrollHeight;
          var height = Math.max(bHeight, dHeight); // 取最大值
          Iframe.height = height;
          } catch (ex) { }
        };
      window.setInterval("setIframe('main-content-iframe')",10);
    </script>
  </body>
</html>