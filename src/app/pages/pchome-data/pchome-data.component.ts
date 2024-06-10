import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';


@Component({
  selector: 'app-pchome-data',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    
  ],
  templateUrl: './pchome-data.component.html',
  styleUrl: './pchome-data.component.css'
})
export class PchomeDataComponent implements OnInit, OnDestroy {
  formData : any;
  states : any ;
  acData : any;
  listOfParentData: any  = [];
  resultDataList : any;
  resultData : any;

  slides = [
   {
       acName: "Arithang (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK242604.jpg",
       candidateName: "Arun Kumar Upreti",
       partyName: "SKM",
       partyImage: "https://www.indiastatelections.com/images/party/SKM.png",
       status: "Won"
   },
   {
       acName: "Soreng-Chakung (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK241901.jpg",
       candidateName: "P S Tamang",
       partyName: "SKM",
       partyImage: "https://www.indiastatelections.com/images/party/SKM.png",
       status: "Won"
   },
   {
       acName: "Namchi-Singhithang (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK241102.jpg",
       candidateName: "Krishna Kumari Rai",
       partyName: "SKM",
       partyImage: "https://www.indiastatelections.com/images/party/SKM.png",
       status: "Won"
   },
   {
       acName: "Rhenock (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK241901.jpg",
       candidateName: "P S Tamang",
       partyName: "SKM",
       partyImage: "https://www.indiastatelections.com/images/party/SKM.png",
       status: "Won"
   },
   {
       acName: "Upper Burtuk (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK242804.jpg",
       candidateName: "Dilli Ram Thapa",
       partyName: "BJP",
       partyImage: "https://www.indiastatelections.com/images/party/BJP.png",
       status: "Lost"
   },
   {
       acName: "Namcheybung (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK242202.jpg",
       candidateName: "Pawan Kumar Chamling",
       partyName: "SDF",
       partyImage: "https://www.indiastatelections.com/images/party/SDF.png",
       status: "Lost"
   },
   {
       acName: "Gangtok (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK242701.jpg",
       candidateName: "Snumit Targain",
       partyName: "INC",
       partyImage: "https://www.indiastatelections.com/images/party/INC.png",
       status: "Lost"
   },
   {
       acName: "Barfung (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK240904.jpg",
       candidateName: "Bhaichung Bhutia",
       partyName: "SDF",
       partyImage: "https://www.indiastatelections.com/images/party/SDF.png",
       status: "Lost"
   },
   {
       acName: "Poklok-Kamrang (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK242202.jpg",
       candidateName: "Pawan Kumar Chamling",
       partyName: "SDF",
       partyImage: "https://www.indiastatelections.com/images/party/SDF.png",
       status: "Lost"
   },
   {
       acName: "Rhenock (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK241905.jpg",
       candidateName: "Som Nath Poudyal",
       partyName: "SDF",
       partyImage: "https://www.indiastatelections.com/images/party/SDF.png",
       status: "Lost"
   },
   {
       acName: "Maneybung-Dentam (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK240306.jpg",
       candidateName: "Narendra Kumar Subba",
       partyName: "BJP",
       partyImage: "https://www.indiastatelections.com/images/party/BJP.png",
       status: "Lost"
   },
   {
       acName: "Barfung (Sikkim)",
       candidateImage: "https://www.indiastatelections.com/images/candidate/2024/SK/SK240902.jpg",
       candidateName: "Tashi Dadul Bhutia",
       partyName: "BJP",
       partyImage: "https://www.indiastatelections.com/images/party/BJP.png",
       status: "Lost"
   }
];

  
  constructor(
    private fb : FormBuilder
  ) {
    this.formData = this.fb.group({
      state : ['Sikkim'],
      ac : [26],
    });
    
  }

   
 currentSlide = 0;
 autoSlideInterval: any;

 ngOnInit() {
   this.startAutoSlide();
   this.loadData();    
   this.getWinningTableData();
 }

 ngOnDestroy() {
   this.stopAutoSlide();
 }

 nextSlide() {
   this.currentSlide = (this.currentSlide + 1) % this.slides.length;
 }

 prevSlide() {
   this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
 }

 isSlideVisible(index: number): boolean {
   const totalVisibleSlides = 4;
   const visibleRangeStart = this.currentSlide;
   const visibleRangeEnd = (this.currentSlide + totalVisibleSlides) % this.slides.length;
   if (visibleRangeStart < visibleRangeEnd) {
     return index >= visibleRangeStart && index < visibleRangeEnd;
   } else {
     return index >= visibleRangeStart || index < visibleRangeEnd;
   }
 }

 startAutoSlide() {
   this.autoSlideInterval = setInterval(() => {
     this.nextSlide();
   }, 3000); // Change slide every 3 seconds
 }

 stopAutoSlide() {
   clearInterval(this.autoSlideInterval);
 }

 onMouseEnter() {
   this.stopAutoSlide();
 }

 onMouseLeave() {
   this.startAutoSlide();
 }

 tableData  = [
  {
    "party": "SKM",
    "lead": 13,
    "won": 30,
    "total": 50,
    "partyColor": "A10002"
  },
  {
    "party": "BJP",
    "lead": 25,
    "won": 40,
    "total": 60,
    "partyColor": "FF9933"
  },
  {
    "party": "INC",
    "lead": 5,
    "won": 15,
    "total": 50,
    "partyColor": "0077CC"
  },
  {
    "party": "AITC",
    "lead": 10,
    "won": 35,
    "total": 55,
    "partyColor": "FF66CC"
  },
  {
    "party": "AAP",
    "lead": 8,
    "won": 25,
    "total": 40,
    "partyColor": "00BFFF"
  },
  {
    "party": "SS",
    "lead": 3,
    "won": 20,
    "total": 30,
    "partyColor": "FFD700"
  },
  {
    "party": "SP",
    "lead": 7,
    "won": 18,
    "total": 45,
    "partyColor": "FF4500"
  }
]
getcolor(data : any) {
  return data?.partyColor;
}
onStateChange() {
  console.log('state change');
  
}

onAcChange() {
  console.log(this.formData.value);
  this.getWinningTableData();
}


loadData() {

  this.states = [{"State_Name":"Andaman_&_Nicobar_Islands","State_Code":"AN"},{"State_Name":"Andhra_Pradesh","State_Code":"AP"},{"State_Name":"Arunachal_Pradesh","State_Code":"AR"},{"State_Name":"Assam","State_Code":"AS"},{"State_Name":"Bihar","State_Code":"BR"},{"State_Name":"Chandigarh","State_Code":"CH"},{"State_Name":"Chhattisgarh","State_Code":"CG"},{"State_Name":"Dadra_&_Nagar_Haveli","State_Code":"DN"},{"State_Name":"Daman_&_Diu","State_Code":"DD"},{"State_Name":"Delhi","State_Code":"DL"},{"State_Name":"Goa","State_Code":"GA"},{"State_Name":"Gujarat","State_Code":"GJ"},{"State_Name":"Haryana","State_Code":"HR"},{"State_Name":"Himachal_Pradesh","State_Code":"HP"},{"State_Name":"Jammu_&_Kashmir","State_Code":"JK"},{"State_Name":"Jharkhand","State_Code":"JH"},{"State_Name":"Karnataka","State_Code":"KA"},{"State_Name":"Kerala","State_Code":"KL"},{"State_Name":"Lakshadweep","State_Code":"LD"},{"State_Name":"Madhya_Pradesh","State_Code":"MP"},{"State_Name":"Maharashtra","State_Code":"MH"},{"State_Name":"Manipur","State_Code":"MN"},{"State_Name":"Meghalaya","State_Code":"ML"},{"State_Name":"Mizoram","State_Code":"MZ"},{"State_Name":"Nagaland","State_Code":"NL"},{"State_Name":"Odisha","State_Code":"OD"},{"State_Name":"Puducherry","State_Code":"PY"},{"State_Name":"Punjab","State_Code":"PB"},{"State_Name":"Rajasthan","State_Code":"RJ"},{"State_Name":"Sikkim","State_Code":"SK"},{"State_Name":"Tamil_Nadu","State_Code":"TN"},{"State_Name":"Telangana","State_Code":"TG"},{"State_Name":"Tripura","State_Code":"TR"},{"State_Name":"Uttar_Pradesh","State_Code":"UP"},{"State_Name":"Uttarakhand","State_Code":"UK"},{"State_Name":"West_Bengal","State_Code":"WB"}];
  
  this.acData = "[{\"stateid\":11,\"ac\":\"Arithang\",\"acno\":26},{\"stateid\":11,\"ac\":\"Barfung\",\"acno\":9},{\"stateid\":11,\"ac\":\"Chujachen\",\"acno\":20},{\"stateid\":11,\"ac\":\"Daramdin\",\"acno\":6},{\"stateid\":11,\"ac\":\"Djongu\",\"acno\":30},{\"stateid\":11,\"ac\":\"Gangtok\",\"acno\":27},{\"stateid\":11,\"ac\":\"Gnathang-Machong\",\"acno\":21},{\"stateid\":11,\"ac\":\"Gyalshing-Barnyak\",\"acno\":4},{\"stateid\":11,\"ac\":\"Kabi Lungchuk\",\"acno\":29},{\"stateid\":11,\"ac\":\"Khamdong-Singtam\",\"acno\":17},{\"stateid\":11,\"ac\":\"Lachen Mangan\",\"acno\":31},{\"stateid\":11,\"ac\":\"Maneybung-Dentam\",\"acno\":3},{\"stateid\":11,\"ac\":\"Martam-Rumtek\",\"acno\":24},{\"stateid\":11,\"ac\":\"Melli\",\"acno\":12},{\"stateid\":11,\"ac\":\"Namcheybung\",\"acno\":22},{\"stateid\":11,\"ac\":\"Namchi-Singhithang\",\"acno\":11},{\"stateid\":11,\"ac\":\"Namthang-Rateypani\",\"acno\":13},{\"stateid\":11,\"ac\":\"Poklok-Kamrang\",\"acno\":10},{\"stateid\":11,\"ac\":\"Rangang-Yangang\",\"acno\":15},{\"stateid\":11,\"ac\":\"Rhenock\",\"acno\":19},{\"stateid\":11,\"ac\":\"Rinchenpong\",\"acno\":5},{\"stateid\":11,\"ac\":\"Salghari-Zoom\",\"acno\":8},{\"stateid\":11,\"ac\":\"Sangha\",\"acno\":32},{\"stateid\":11,\"ac\":\"Shyari\",\"acno\":23},{\"stateid\":11,\"ac\":\"Soreng-Chakung\",\"acno\":7},{\"stateid\":11,\"ac\":\"Temi-Namphing\",\"acno\":14},{\"stateid\":11,\"ac\":\"Tumen-Lingi\",\"acno\":16},{\"stateid\":11,\"ac\":\"Upper Burtuk\",\"acno\":28},{\"stateid\":11,\"ac\":\"Upper Tadong\",\"acno\":25},{\"stateid\":11,\"ac\":\"West Pendam\",\"acno\":18},{\"stateid\":11,\"ac\":\"Yangthang\",\"acno\":2},{\"stateid\":11,\"ac\":\"Yoksam-Tashiding\",\"acno\":1}]";
  this.acData = JSON.parse(this.acData)

  let parent = "[{\"stateid\":11,\"pcno\":26,\"ac\":null,\"candidate\":\"Udai Gurung\",\"party\":\"BJP\",\"plogo\":\"https://www.indiastatelections.com/images/party/BJP.png\",\"gender\":\"Male\",\"age\":\"56\",\"education\":\"Secondary\",\"crimecases\":0,\"totalassets\":\"49.51 Crore\",\"photo\":\"https://www.indiastatelections.com/images/candidate/2024/SK/SK242602.jpg\"},{\"stateid\":11,\"pcno\":26,\"ac\":null,\"candidate\":\"Sumitra Rai\",\"party\":\"INC\",\"plogo\":\"https://www.indiastatelections.com/images/party/INC.png\",\"gender\":\"Female\",\"age\":\"53\",\"education\":\"Upper Primary\",\"crimecases\":0,\"totalassets\":\"1.63 Lakh\",\"photo\":\"https://www.indiastatelections.com/images/candidate/2024/SK/SK242601.jpg\"},{\"stateid\":11,\"pcno\":26,\"ac\":null,\"candidate\":\"Arun Kumar Upreti\",\"party\":\"SKM\",\"plogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"gender\":\"Male\",\"age\":\"56\",\"education\":\"Senior Secondary\",\"crimecases\":0,\"totalassets\":\"26.06 Crore\",\"photo\":\"https://www.indiastatelections.com/images/candidate/2024/SK/SK242604.jpg\"},{\"stateid\":11,\"pcno\":26,\"ac\":null,\"candidate\":\"Ashis Rai\",\"party\":\"SDF\",\"plogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"gender\":\"Male\",\"age\":\"49\",\"education\":\"Graduate\",\"crimecases\":0,\"totalassets\":\"17.41 Crore\",\"photo\":\"https://www.indiastatelections.com/images/candidate/2024/SK/SK242605.jpg\"},{\"stateid\":11,\"pcno\":26,\"ac\":null,\"candidate\":\"Rikesh Pradhan\",\"party\":\"CAPS\",\"plogo\":\"https://www.indiastatelections.com/images/party/CAPS.png\",\"gender\":\"Male\",\"age\":\"46\",\"education\":\"Upper Primary\",\"crimecases\":0,\"totalassets\":\"3.42 Crore\",\"photo\":\"https://www.indiastatelections.com/images/candidate/2024/SK/SK242603.jpg\"}]";

  this.listOfParentData = JSON.parse(parent)
  this.listOfParentData.map((data : any) => data.expand = false);

  let data = "{\"Table\":[{\"StateName\":\"Sikkim\",\"AC_No\":26,\"AC\":\"Arithang\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Arun Kumar Upreti\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Ashis Rai\",\"WIN_VOTE\":5356,\"RUN_VOTE\":2627,\"Status\":\"Y\",\"Winner_Votes_per\":\"61\",\"Runner_Votes_per\":\"30\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":9,\"AC\":\"Barfung\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Rikshal Dorjee Bhutia\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Bhaichung Bhutia\",\"WIN_VOTE\":8358,\"RUN_VOTE\":4012,\"Status\":\"Y\",\"Winner_Votes_per\":\"61\",\"Runner_Votes_per\":\"29\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":20,\"AC\":\"Chujachen\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Puran Kr. Gurung\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Mani Kumar Gurung\",\"WIN_VOTE\":8199,\"RUN_VOTE\":4865,\"Status\":\"Y\",\"Winner_Votes_per\":\"55\",\"Runner_Votes_per\":\"33\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":6,\"AC\":\"Daramdin\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Mingma Norbu Sherpa\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Pem Norbu Sherpa\",\"WIN_VOTE\":9404,\"RUN_VOTE\":3429,\"Status\":\"Y\",\"Winner_Votes_per\":\"68\",\"Runner_Votes_per\":\"24\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":30,\"AC\":\"Djongu\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Pintso Namgyal Lepcha\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Sonam Gyatso Lepcha\",\"WIN_VOTE\":6402,\"RUN_VOTE\":1395,\"Status\":\"Y\",\"Winner_Votes_per\":\"69\",\"Runner_Votes_per\":\"15\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":27,\"AC\":\"Gangtok\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Delay Namgyal Barfungpa\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Pintso Chopel Lepcha\",\"WIN_VOTE\":4440,\"RUN_VOTE\":1748,\"Status\":\"Y\",\"Winner_Votes_per\":\"57\",\"Runner_Votes_per\":\"22\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":21,\"AC\":\"Gnathang-Machong\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Pamin Lepcha\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Tshering Wangdi Lepcha\",\"WIN_VOTE\":6676,\"RUN_VOTE\":2869,\"Status\":\"Y\",\"Winner_Votes_per\":\"61\",\"Runner_Votes_per\":\"26\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":4,\"AC\":\"Gyalshing-Barnyak\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Lok Nath Sharma\",\"Runp\":\"IND\",\"runplogo\":\"https://www.indiastatelections.com/images/party/IND.png\",\"Runner\":\"Khusandra Prasad Sharma\",\"WIN_VOTE\":5612,\"RUN_VOTE\":4649,\"Status\":\"Y\",\"Winner_Votes_per\":\"48\",\"Runner_Votes_per\":\"40\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":29,\"AC\":\"Kabi Lungchuk\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Thenlay Tshering Bhutia\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Gnawo Chopel Lepcha\",\"WIN_VOTE\":5882,\"RUN_VOTE\":4189,\"Status\":\"Y\",\"Winner_Votes_per\":\"54\",\"Runner_Votes_per\":\"38\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":17,\"AC\":\"Khamdong-Singtam\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Nar Bahadur Dahal\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Mani Kumar Sharma\",\"WIN_VOTE\":5882,\"RUN_VOTE\":4143,\"Status\":\"Y\",\"Winner_Votes_per\":\"52\",\"Runner_Votes_per\":\"37\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":31,\"AC\":\"Lachen Mangan\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Samdup Lepcha\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Hishey Lachungpa\",\"WIN_VOTE\":3929,\"RUN_VOTE\":3078,\"Status\":\"Y\",\"Winner_Votes_per\":\"56\",\"Runner_Votes_per\":\"43\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":3,\"AC\":\"Maneybung-Dentam\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Sudesh Kumar Subba\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Tika Ram Chettri\",\"WIN_VOTE\":8553,\"RUN_VOTE\":2514,\"Status\":\"Y\",\"Winner_Votes_per\":\"61\",\"Runner_Votes_per\":\"17\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":24,\"AC\":\"Martam-Rumtek\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Sonam Tsh. Venchungpa\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Mechung Bhutia\",\"WIN_VOTE\":8070,\"RUN_VOTE\":5308,\"Status\":\"Y\",\"Winner_Votes_per\":\"54\",\"Runner_Votes_per\":\"35\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":12,\"AC\":\"Melli\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Nar Bahadur Pradhan\",\"Runp\":\"CAPS\",\"runplogo\":\"https://www.indiastatelections.com/images/party/CAPS.png\",\"Runner\":\"Ganesh Kumar Rai\",\"WIN_VOTE\":7904,\"RUN_VOTE\":3621,\"Status\":\"Y\",\"Winner_Votes_per\":\"58\",\"Runner_Votes_per\":\"26\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":22,\"AC\":\"Namcheybung\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Raju Basnet\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Pawan Kumar Chamling\",\"WIN_VOTE\":7195,\"RUN_VOTE\":4939,\"Status\":\"Y\",\"Winner_Votes_per\":\"54\",\"Runner_Votes_per\":\"37\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":11,\"AC\":\"Namchi-Singhithang\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Krishna Kumari Rai\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Bimal Rai\",\"WIN_VOTE\":7907,\"RUN_VOTE\":2605,\"Status\":\"Y\",\"Winner_Votes_per\":\"72\",\"Runner_Votes_per\":\"23\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":13,\"AC\":\"Namthang-Rateypani\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Sanjeet Kharel\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Suman Pradhan\",\"WIN_VOTE\":8949,\"RUN_VOTE\":3344,\"Status\":\"Y\",\"Winner_Votes_per\":\"64\",\"Runner_Votes_per\":\"24\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":10,\"AC\":\"Poklok-Kamrang\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Bhoj Raj Rai\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Pawan Kumar Chamling\",\"WIN_VOTE\":8037,\"RUN_VOTE\":4974,\"Status\":\"Y\",\"Winner_Votes_per\":\"55\",\"Runner_Votes_per\":\"34\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":15,\"AC\":\"Rangang-Yangang\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Raj Kumari Thapa\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Mani Kumar Subba\",\"WIN_VOTE\":6514,\"RUN_VOTE\":5313,\"Status\":\"Y\",\"Winner_Votes_per\":\"51\",\"Runner_Votes_per\":\"41\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":19,\"AC\":\"Rhenock\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"P S Tamang\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Som Nath Poudyal\",\"WIN_VOTE\":10094,\"RUN_VOTE\":3050,\"Status\":\"Y\",\"Winner_Votes_per\":\"65\",\"Runner_Votes_per\":\"19\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":5,\"AC\":\"Rinchenpong\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Erung Tenzing Lepcha\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Norden Bhutia\",\"WIN_VOTE\":9624,\"RUN_VOTE\":3224,\"Status\":\"Y\",\"Winner_Votes_per\":\"70\",\"Runner_Votes_per\":\"23\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":8,\"AC\":\"Salghari-Zoom\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Madan Cintury\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Janga Bir Darnal\",\"WIN_VOTE\":5678,\"RUN_VOTE\":2966,\"Status\":\"Y\",\"Winner_Votes_per\":\"59\",\"Runner_Votes_per\":\"31\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":32,\"AC\":\"Sangha\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Sonam Lama\",\"Runp\":\"BJP\",\"runplogo\":\"https://www.indiastatelections.com/images/party/BJP.png\",\"Runner\":\"Tseten Tashi Bhutia\",\"WIN_VOTE\":1919,\"RUN_VOTE\":1054,\"Status\":\"Y\",\"Winner_Votes_per\":\"61\",\"Runner_Votes_per\":\"34\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":23,\"AC\":\"Shyari\",\"Winp\":\"SDF\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"winclr\":\"#BEEF43\",\"Winner\":\"Tenzing Norbu Lamtha\",\"Runp\":\"SKM\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"Runner\":\"Kunga Nima Lepcha\",\"WIN_VOTE\":6633,\"RUN_VOTE\":5319,\"Status\":\"Y\",\"Winner_Votes_per\":\"52\",\"Runner_Votes_per\":\"41\",\"Grandp\":\"SDF\",\"Grandclr\":\"#BEEF43\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":7,\"AC\":\"Soreng-Chakung\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"P S Tamang\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Dr. A D Subba\",\"WIN_VOTE\":10480,\"RUN_VOTE\":3084,\"Status\":\"Y\",\"Winner_Votes_per\":\"73\",\"Runner_Votes_per\":\"21\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":14,\"AC\":\"Temi-Namphing\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Bedu Singh Panth\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Suman Kumar Tewari\",\"WIN_VOTE\":6759,\"RUN_VOTE\":3201,\"Status\":\"Y\",\"Winner_Votes_per\":\"52\",\"Runner_Votes_per\":\"25\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":16,\"AC\":\"Tumen-Lingi\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Samdup Tshering Bhutia\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Norzong Lepcha\",\"WIN_VOTE\":8265,\"RUN_VOTE\":4177,\"Status\":\"Y\",\"Winner_Votes_per\":\"58\",\"Runner_Votes_per\":\"29\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":28,\"AC\":\"Upper Burtuk\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Kala Rai\",\"Runp\":\"BJP\",\"runplogo\":\"https://www.indiastatelections.com/images/party/BJP.png\",\"Runner\":\"Dilli Ram Thapa\",\"WIN_VOTE\":6323,\"RUN_VOTE\":3755,\"Status\":\"Y\",\"Winner_Votes_per\":\"50\",\"Runner_Votes_per\":\"30\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":25,\"AC\":\"Upper Tadong\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"G.T. Dhungel\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Dr. Chandra Bahadur Chettri\",\"WIN_VOTE\":6209,\"RUN_VOTE\":2120,\"Status\":\"Y\",\"Winner_Votes_per\":\"68\",\"Runner_Votes_per\":\"23\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":18,\"AC\":\"West Pendam\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Lall Bahadur Das\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Anup Thatal\",\"WIN_VOTE\":6237,\"RUN_VOTE\":4285,\"Status\":\"Y\",\"Winner_Votes_per\":\"49\",\"Runner_Votes_per\":\"33\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":2,\"AC\":\"Yangthang\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Bhim Hang Limboo\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Kesham Limboo\",\"WIN_VOTE\":6621,\"RUN_VOTE\":4065,\"Status\":\"Y\",\"Winner_Votes_per\":\"55\",\"Runner_Votes_per\":\"33\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"},{\"StateName\":\"Sikkim\",\"AC_No\":1,\"AC\":\"Yoksam-Tashiding\",\"Winp\":\"SKM\",\"winplogo\":\"https://www.indiastatelections.com/images/party/SKM.png\",\"winclr\":\"#A10002\",\"Winner\":\"Tshering Thendup Bhutia\",\"Runp\":\"SDF\",\"runplogo\":\"https://www.indiastatelections.com/images/party/SDF.png\",\"Runner\":\"Meewang Gyatso Bhutia\",\"WIN_VOTE\":8271,\"RUN_VOTE\":3459,\"Status\":\"Y\",\"Winner_Votes_per\":\"60\",\"Runner_Votes_per\":\"25\",\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"phases\":0.0,\"date_of_poll\":\"\",\"date_of_counting\":\"\",\"phase_color\":\"\"}],\"Table1\":[{\"winp\":\"SKM\",\"winclr\":\"#A10002\",\"WON\":31,\"LEAD\":0,\"TOTAL\":31},{\"winp\":\"SDF\",\"winclr\":\"#BEEF43\",\"WON\":1,\"LEAD\":0,\"TOTAL\":1}],\"Table2\":[{\"Grandp\":\"SKM\",\"Grandclr\":\"#A10002\",\"POrder\":0,\"WON\":31,\"LEAD\":0,\"TOTAL\":31,\"OrderBy\":0.0},{\"Grandp\":\"SDF\",\"Grandclr\":\"#BEEF43\",\"POrder\":0,\"WON\":1,\"LEAD\":0,\"TOTAL\":1,\"OrderBy\":0.0}],\"Table3\":[{\"Grandp\":\"SKM\",\"winp\":\"SKM\",\"winclr\":\"#A10002\",\"WON\":31,\"LEAD\":0,\"TOTAL\":31,\"OrderBy\":0.0},{\"Grandp\":\"SDF\",\"winp\":\"SDF\",\"winclr\":\"#BEEF43\",\"WON\":1,\"LEAD\":0,\"TOTAL\":1,\"OrderBy\":0.0}]}";

  this.resultDataList = JSON.parse(data);

}

getsubTableData(data : any) : any[] {
  return [data];
}

getWinningTableData() {
  this.resultData = this.resultDataList[Object.keys(this.resultDataList)[0]].filter((item : any) => item.StateName == this.formData.value.state && item.AC_No == this.formData.value.ac);
  this.resultData.map((item : any) => {
   this.listOfParentData.forEach((element : any) => {
      if(element.candidate == item.Winner){
        item.winnerPhoto = element.photo;
      } else if(element.candidate == item.Runner){
        item.runnerPhoto = element.photo;
      }
   });
  });
  console.log(this.resultData);
}
}