const slugify=require("slugify");
const {Blog}=require("../models/schema");

async function generateSlug(title,userId){
    let baseSlug=slugify(title,{lower:true,strict:true});
    let slug=baseSlug;
    let count=1;
    while (await Blog.findOne({userId,slug})){
        slug= `${baseSlug}-${count++}`;
    }

    return slug;
}

module.exports=generateSlug;