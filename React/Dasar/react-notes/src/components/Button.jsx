const Button = ({ children, click, ttl, bg }) => {
    return (
        <button
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full text-white shadow-md ${bg}`}
            aria-label={ttl}
            title={ttl}
            onClick={click}
        >
            {children}
        </button>
    );
};

export default Button;
