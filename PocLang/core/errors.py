# PocLang core

class NotImplemented(Exception):
    def __init__(self, cls):
        super().__init__("PocLang: %s" % cls.__name__)
