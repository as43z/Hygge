from libpy.strutils.tokenizer import Token
from libpy.ds.tree import GTNode

class ASTNode(GTNode):
    """
    An ASTNode is a node in the Abstract Syntax Tree.
    It inherits directly from a Generic Tree Node, as the
    structure is similar.
    """
    def __init__(self, parent=None):
        super().__init__(parent)
    
def ast(tokens: list[Token]) -> list[ASTNode]:
    """
    Creates a list of expressions.

    tokens: list[Token] -- Is the list of Tokens to convert to blocks.
    return: A list of expressions structured as an AST tree.
    """
    raise NotImplemented(ast)

