import { useState } from "react"

export const ScrollButton = () => {
    const [visible, setVisible] = useState<boolean>(false)

    const toggleVisible = () => {
        const scrolled  = document.documentElement.scrollTop
        if (scrolled > 250) {
            setVisible(true)
        } else if (scrolled <= 250) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    window.addEventListener('scroll', toggleVisible)

    return (
        <div style={{ 'display' : visible ? 'grid' : 'none' }} onClick={scrollToTop} className="scroll-btn">
            <i className="fa-solid fa-chevron-up"></i>
        </div>
    )
}