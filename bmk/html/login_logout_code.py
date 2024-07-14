#!/usr/bin/python

from tornado.web import RequestHandler, StaticFileHandler
from tornado.ioloop import IOLoop
from tornado.web import Application
import asyncio
import aiomysql
import logging
import tornado.locks

DBCONFIG = {
        "db":"userlogin_test",
        "user":"finger",
        "passwd":"fypingfyping",
        "host":"localhost",
        "port":3308,
        #"cursorclass":pymysql.cursors.DictCursor,
        #"pool_size":10,
        #"pool_name":"mypool",
}

class Application(Application):
    def __init__(self,pool):
        self.pool = pool
        settings = {
            "auto_reload":True,
            "debug":True,
            }
        handlers = [
            (r'/login',LoginHandler,),
            (r'/(.*)',StaticFileHandler,{"path":"./templates"}),
        ]
        super(Application,self).__init__(handlers,**settings)

class BaseHandler(RequestHandler):
    async def prepare(self):
        # async def query_user_exists(stmt,*args):
        #     await self.cur.execute("select count(id) from `user` where name=%s and passwd=%s",list(args))
        #     return bool(len(await self.cur.fetchone())>0)
        mgr = await self.application.pool.acquire()
        aexit = aiomysql.connection.Connection.__aexit__
        aenter = await aiomysql.connection.Connection.__aenter__(mgr)
        self.conn = aenter
        try:
            mg_ = await self.conn.cursor()
            aexit_ = aiomysql.cursors.Cursor.__aexit__
            aenter_ = await aiomysql.cursors.Cursor.__aenter__(mg_)
            self.cur = aenter_
            try:
                await self.cur.execute("select count(id) from `user` where name='very-secret' and passwd='fuckk'")
                self.query_exists_result = await self.cur.fetchone()
            except:
                print("光标已经关闭")
                if not await aexit_(mg_,*sys.exc_info()):
                    raise
            else:
                await aexit_(mg_,None,None,None)
        except:
            if not await aexit(mgr,*sys.exc_info()):
                raise
        else:
            await aexit(mgr,None,None,None)
        if not self.request.remote_ip == '154.210.12.92':
            self.render("templates/index.html")
    async def get_query_result(self):
        return self.query_exists_result
    def on_finish(self):
        pass
    async def query_user_exists(self,stmt,*args):
            return bool(len(await self.cur.fetchone())>0)
class LoginHandler(BaseHandler):
        async def get(self):
                print(self.request.remote_ip)
                self.render("templates/login.html")
        async def post(self):
                name = self.get_argument("name","-blank-")
                passwd = self.get_argument("passwd","")
                exists =  bool(await self.get_query_result())
                if exists:
                        self.redirect("https://fangself.com.cn")
                else:
                        self.redirect("https://www.baidu.com")

async def main():
    try:
        pool = await aiomysql.create_pool(host='localhost',
        port=3308, 
        user='finger',
        password='fypingfyping', 
        db='userlogin_test',
        #max_idle_connections=1,
        #max_recycle_sec=3)
        )
        app = Application(pool)
        logger.info("start listening")
        app.listen(8080)
        
        shutdown_event = tornado.locks.Event()
        await shutdown_event.wait()
    except KeyboardInterrupt as e:
        print(e)
        logger.debug(e)
        import sys
        sys.exit()       

if __name__ == "__main__":
    logging.basicConfig(filename="log",level=logging.DEBUG)
    logger = logging.getLogger(name="test")
    IOLoop.current().run_sync(main)
