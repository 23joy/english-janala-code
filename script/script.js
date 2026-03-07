const createElements=(arr)=>{
    // console.log(arr);
    const htmlElements=arr.map((el)=>`<span class="btn">${el}</span>`)
    return htmlElements.join(" ")
}



const loadLessons=()=>{
    // promise of response
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json()) //promise of json data
    .then((json)=>displyLesson(json.data))

};
const removeActive=()=>{
    const lessonButtons=document.querySelectorAll(".lesson-btn");
    // console.log(lessonButtons);
    lessonButtons.forEach((btn)=>btn.classList.remove("active"))
};
const loadLevelWord=(id)=>{
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=> {
        removeActive();
        const clickBtn=document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        
        displylevelWord(data.data)
    });

}
const loadWordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(url);
    const res=await fetch(url);
    const details=await res.json();
    displyWordDetails(details.data)
}

// id: 5
// level: 1
// meaning: "আগ্রহী"
// partsOfSpeech: "adjective"
// points: 1
// pronunciation: "ইগার"
// sentence: "The kids were eager to open their gifts."
// synonyms: (3) ['enthusiastic', 'excited', 'keen']
// word: "Eager"

const displyWordDetails=(word)=>{
    console.log(word)
    const detailContainer=document.getElementById("Detail-container")
    detailContainer.innerHTML=`<div  id="Detail-container" class="space-y-5">
                <div class="">
                    <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation} )</h2>
                </div>
                <div class="">
                    <h2 class="text-2xl font-bold">Meaning</h2>
                    <h2 >${word.meaning} </h2>
                </div>
                <div class="">
                    <h2 class="text-2xl font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class="">
                    <h2 class="text-2xl font-bold">সমার্থক শব্দ গুলো</h2>
                    <div class="">${createElements(word.synonyms)}</div>
                </div>
            </div>`;
    document.getElementById("word_modal").showModal();

}

const displylevelWord=(words)=>{
    const wordsContainer=document.getElementById("words-container")
    wordsContainer.innerHTML=``;
    if(words.length==0){
        wordsContainer.innerHTML=`
        <div class="text-center col-span-full rounded-xl space-y-6 py-10">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-4xl font-medium font-bangla">নেক্সট Lesson এ যান</h2>
        </div>
        `;

    }
    words.forEach(word => {
        // console.log(word)
       const card=document.createElement("div")
       card.innerHTML=`
              <div class="bg-white rounded-xl shadow-sm text-center py-20 gap-4 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word?word.word:"শব্দ পাওয়া যায় নি"} </h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="text-2xl font-medium font-bangla">"${word.meaning ?word.meaning:"অর্থ পাওয়া যায় নি"}/ ${word.pronunciation?word.pronunciation: "pronunciaion পাওয়া যায় নি" } "</div>

            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id} )" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
       `;
       wordsContainer.append(card);
    });
}
const displyLesson=(lessons)=>{
    //1.get the container
    const levelContainer=document.getElementById("level-container")
    levelContainer.innerHTML="";
    // 2.get into every lessons
    for(let lesson of lessons){
         // 3.create Element
         const btnDiv=document.createElement("div")
         btnDiv.innerHTML=`
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> lesson-${lesson.level_no} </button>
         `;
    // 4.appent into container
    levelContainer.append(btnDiv);
    }
}
loadLessons();