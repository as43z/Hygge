from core.ast import ast, ASTNode
from libpy.ds.tree import GTNode, repr_gt_node

root = ASTNode()
for i in range(3):
    root.children.append(ASTNode(parent = root))

root.children[1].children.append(ASTNode(parent = root.children[1]))
root.children[1].children.append(ASTNode(parent = root.children[1]))
root.children[1].children.append(ASTNode(parent = root.children[1]))

root.children[2].children.append(ASTNode(parent = root.children[2]))
root.children[2].children.append(ASTNode(parent = root.children[2]))
repr_gt_node(root)
