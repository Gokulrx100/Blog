function buildCommentTree(comments){
    const map = {};
    const roots = [];

    comments.forEach(comment => {
        let content=comment.deleted?"[deleted]":comment.content;
        map[comment._id] = { ...comment,content:content,replies: [] };
    });

    comments.forEach(comment => {
        if (comment.parent) {
            if (map[comment.parent]) {
                map[comment.parent].replies.push(map[comment._id]);
            }
        } else {
            roots.push(map[comment._id]);
        }
    });

    return roots;
}

module.exports = buildCommentTree;