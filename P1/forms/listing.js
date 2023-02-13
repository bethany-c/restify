function increment_g() {
          document.getElementById('GuestInput').stepUp();
       }
       function decrement_g() {
          document.getElementById('GuestInput').stepDown();
       }
       function increment_b() {
          document.getElementById('BedRoomInput').stepUp();
       }
       function decrement_b() {
          document.getElementById('BedRoomInput').stepDown();
       }
       function increment_bath() {
          document.getElementById('BathRoomInput').stepUp();
       }
       function decrement_bath() {
          document.getElementById('BathRoomInput').stepDown();
       }
       function increment_Bed() {
          document.getElementById('BedInput').stepUp();
       }
       function decrement_Bed() {
          document.getElementById('BedInput').stepDown();
       }
       function delete_all() {
          document.getElementById('files').value = "";
       }


// function display(){

//     var files = document.getElementById("files").files;
//     var output = document.getElementById("result");

//     for (var i = 0; i < files.length; i++) {
//             var file = files[i];
//             //Only pics
//             if (!file.type.match('image'))
//               continue;
//             var picReader = new FileReader();
//             picReader.addEventListener("load", function(event) {
//               var picFile = event.target;
//               var div = document.createElement("div");
//               div.innerHTML = "<img class='thumbnail' src='" + picFile.result + "'" +
//                 "title='" + picFile.name + "'/>";
//                   output.insertBefore(div, null);
//             });
//             //Read the image
//             picReader.readAsDataURL(file);

//           }

//         }




