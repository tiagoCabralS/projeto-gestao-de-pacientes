function TdLabel(props){
    return <td {...props} className="font-bold">{props.children}</td>
}

export default TdLabel;