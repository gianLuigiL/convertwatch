const scroll_to_top = () => {
    if(window) {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
}

export default scroll_to_top;