from core.ast import ast, Node
from core.lib.representation import repr_node

root = Node()
for i in range(3):
    root.children.append(Node(parent = root))

root.children[1].children.append(Node(parent = root.children[1]))
root.children[1].children.append(Node(parent = root.children[1]))
root.children[1].children.append(Node(parent = root.children[1]))

root.children[2].children.append(Node(parent = root.children[2]))
root.children[2].children.append(Node(parent = root.children[2]))
repr_node(root)
