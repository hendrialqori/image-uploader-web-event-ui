export default function Logo() {
    return (
        <div className="flex-center flex-col -translate-y-11">
            <img src="/lego-icon.png" alt="lego-icon" className="w-44 md:w-auto"/>
            <div className="text-center space-y-1 ">
                <div className="flex-center gap-2 text-lg md:text-2xl font-lilita-one">
                    <p className="text-pertamina-blue">Low</p>
                    <p className="text-forest-green">Emission</p>
                    <p className="text-pertamina-red">Go!</p>
                </div>
                <p className="text-[0.5rem] md:text-[0.6rem] font-inter text-pertamina-blue">Powered by <span className="font-extrabold">PERTAMINA NRE</span></p>
            </div>
        </div>
    )
}