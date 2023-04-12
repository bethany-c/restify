
export default class API {




        static SignUpUser(body){
            return fetch("http://127.0.0.1:8000/webpages/signup/",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }).then(resp => resp.json())
        }

        static LogOutUser() {
            return fetch("http://127.0.0.1:8000/webpages/logout/",{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                },
            })
            .then(resp => resp.json())
            .then((data) => {
                // setIsloggedin(false)
                // setIsHost(false)
            })

        }


}

