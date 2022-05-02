import sys
import http.server
import socketserver
try:
    from configparser import ConfigParser
except ImportError:
    from ConfigParser import ConfigParser  # ver. < 3.0

# I added this new function for reading config files in a better way
def get_config_dict():
    config = ConfigParser()
    config.read('config.ini')
    details_dict = dict(config.items('PROPERTIES'))
    return details_dict

class httpRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path in ["/date", "/time"]:
            self.path = "static" + self.path + ".html"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        elif self.path == "/":
            self.path = "static/index.html"
            return http.server.SimpleHTTPRequestHandler.do_GET(self)


# conf = subprocess.run(["grep", "port=", "/var/tmp/mytime/mytime.conf"], stdout=subprocess.PIPE)
conf = get_config_dict()
if not conf['port']:
    print("Could not read configuration file `/var/tmp/mytime/mytime.conf`")
    sys.exit(1)
port = conf['port']

socketserver.TCPServer.allow_reuse_address = True
server = socketserver.TCPServer(("", int(port)), httpRequestHandler)
server.serve_forever()
