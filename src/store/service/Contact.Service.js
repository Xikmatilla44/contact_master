const ContactService= {



 pushCreateService(payloads) {
      localStorage.setItem('payloads', JSON.stringify(payloads));
     return JSON.parse(localStorage.getItem('payloads'));

 },

    async pushLocalService(payloads) {
        debugger
        let newArr = new Array();
        const allArr= JSON.parse(localStorage.getItem('payloads'));
        newArr.push(... allArr, payloads);

        debugger
        await localStorage.setItem('payloads', JSON.stringify(newArr));

        return JSON.parse(localStorage.getItem('payloads'));

    },


};


export default ContactService;
