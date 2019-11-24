const ContactService= {



 pushCreateService(payloads) {
     // debugger
      localStorage.setItem('payloads', JSON.stringify(payloads));
     const reslut = JSON.parse(localStorage.getItem('payloads'));
      // debugger
     return reslut;
 },

    pushLocalService(payloads) {
        // debugger
        let newArr = new Array();
        if (localStorage.getItem('payloads')){
     // debugger
            const allArr= JSON.parse(localStorage.getItem('payloads'));
            newArr.push(... allArr, payloads);
            localStorage.setItem('payloads', JSON.stringify(newArr));

        }else {
            // debugger
            localStorage.setItem('payloads', JSON.stringify(payloads));
        }
        // debugger
        const reslut = JSON.parse(localStorage.getItem('payloads'));
        // debugger
        return reslut;

    },

    async editeService(index, payloads) {
        const allArr= JSON.parse(localStorage.getItem('payloads'));

        allArr.splice(index,1,  payloads);
        // debugger
        await localStorage.setItem('payloads', JSON.stringify(allArr));

        return JSON.parse(localStorage.getItem('payloads'));

    },


    deleteService(index) {
        // debugger
        const allArr= JSON.parse(localStorage.getItem('payloads'));
        allArr.splice(index,1);
        localStorage.setItem('payloads', JSON.stringify(allArr));

       const reslut = JSON.parse(localStorage.getItem('payloads'));
       // debugger
       return reslut;

   },

    searchService(payload){


     if (payload !==''){

        const allArr= JSON.parse(localStorage.getItem('payloads'));
        const tempData = allArr.filter(item => {
            return item.firstName.toLowerCase().toString().match(payload.toLowerCase())
        });


        // debugger
        return tempData;

     }else {
         const reslut = JSON.parse(localStorage.getItem('payloads'));
         // debugger
         return reslut;


     }


    },



};


export default ContactService;
