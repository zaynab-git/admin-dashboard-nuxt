type Message = {
    receiver: string ,
    sender: string,
    message: string,
    id: number
}

type Messages = {
    [sender: string]: Message[]
}


export  {Message, Messages}