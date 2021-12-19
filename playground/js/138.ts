class INode {
    val: number;
    next: INode | null;
    random: INode | null;
    constructor(val?: number, next?: INode, random?: INode) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
        this.random = (random === undefined ? null : random)
    }
}

function copyRandomList(head: INode | null): INode | null {
    return new INode();
};