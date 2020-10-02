let peter= { name: "Peter", age: 14, gender: "male" }

function addMayDriveProperty(member) {
    let memberClone = {...member};
    // Object.assign(memberClone, member); <-- does same as line above
    memberClone["mayDrive"] = false;
    if (member.age >= 18) {
        memberClone.mayDrive = true;
    }
    return memberClone;
}
const adjustedMember = addMayDriveProperty(peter)
console.log(peter)
console.log(adjustedMember)

// 6 b)
// I added a new variable (memberClone) and used the Object.assign function
// to add the provided member's keys and values to the new object.
// That way, the function returns the memberClone object which has the
// mayDrive attribute, while the original member object 'peter' does not.

// 7

var members = [
    { name: "Peter", age: 14, gender : "male" },
    { name: "Jan", age: 35, gender : "male" },
    { name: "Janne", age: 25,  gender : "female" },
    { name: "Martin", age: 22, gender : "male" }]

function addMayDrivePropertyToAll(members) {
    let membersMayDrive =  members.map(member => addMayDriveProperty(member));
    return membersMayDrive;
}

   const adjustedAll = addMayDrivePropertyToAll(members);
   console.log(members)
   console.log(adjustedAll)

   // 8
    function removeGenderOnAll(members) {
        let membersNoGender = [];
        members.forEach(member => {
            memberNew = {...member};
            delete memberNew.gender;
            membersNoGender.push(memberNew);           
        });
        return membersNoGender;
    }
    
    const adjustedGender = removeGenderOnAll(members);
    console.log(members)
    console.log(adjustedGender)
    
   