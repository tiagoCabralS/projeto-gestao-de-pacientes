function Li(props){
    return <li {...props} className="flex justify-between space-x-3">
        {props.children}
    </li>
}

export default Li;