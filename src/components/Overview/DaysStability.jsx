
export const DaysStability = ({companySelectedId, diasAnimados, runwayStatusColor}) => {
    return (
        <div className="mt-8 flex items-end gap-3">
            <span
            className={`text-7xl font-bold leading-none ${runwayStatusColor}`}
            >
            {companySelectedId ? diasAnimados : "--"}
            </span>

            <div className="mb-2">
            <p className={`text-lg font-semibold ${runwayStatusColor}`}>
                dias
            </p>

            <p className="text-sm leading-5 text-primary">
                de estabilidade <br /> operacional
            </p>
            </div>
        </div>
    )
}