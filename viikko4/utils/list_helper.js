const dummy = (blogs) => {
    return 1;
}


const totalLikes =  (blogs) => {
    let summa = 0
    blogs.forEach(blog => {
        summa += blog.likes
    });

    return summa

}

const favoriteBlog = (blogs) =>{
    let like = -1;
    let palautus = {}
    blogs.forEach(blog =>{
        if(blog.likes > like){
            like = blog.likes
            palautus = blog
        }

    })
    return palautus

}


module.exports = {
    totalLikes,
    dummy,
    favoriteBlog
}