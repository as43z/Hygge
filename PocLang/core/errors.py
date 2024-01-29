# PocLang core

class NotImplemented(Exception):
    def __init__(self, cls):
        super().__init__("%s" % cls.__name__)
