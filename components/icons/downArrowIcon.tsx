const DownArrowIcon = ({size=12, className=''}) => {
    return (
        <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
        </svg>
    )
}

export default DownArrowIcon