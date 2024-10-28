import React from "react";
// ]

const ConstData = {
  CMS_URL : "https://api.edoctry.com/api/",
  UI_URL : "https://test.edoctry.com/",
  jsonPageData : [
    {
      id: "tab-1",
      ttl: "Courses",
      slug: "basic",
    },
    {
      id: "tab-2",
      ttl: "Payment History",
      slug: "photo",
    },
    {
      id: "tab-3",
      ttl: "Profile",
      slug: "basic",
    },
    {
      id: "tab-4",
      ttl: "Photo",
      slug: "photo",
    },
    {
      id: "tab-5",
      ttl: "Privacy Settings",
      slug: "privacy",
    },
  ],
  jsonPaymentHistory : [
    {
        id:1,
        title:"All",
        slug:"All"
     },
     {
        id:2,
        title:"Select Course",
        slug:"All"
     }
 ],
 textConst : {
  register : "Successfully register! ",
  LoginSuccess: "Logged in successfully!",
  invalidData : "Invalid ",
  testSubmit : "Successfully submitted your Answer!",
  videoUploadSuccess : "Video uploaded successfully",
  logoUploadSuccess:"Course Logo uploaded successfully",
  uploadFailed:" uploading failed!",
  EnterField: "Please Enter Field ",
  enterMandatoryField:"Please Enter All Mandatory field!",
  tableCreatedSuccess:"created successfully",
  tableUpdatedSuccess:"Updated SuccessFully",
  tableDeletedSuccess:"Deleted SuccessFully",
  ForgotPassword:"Email sent to your register email, please verify your email",
  newPasswordUpdate:"Your password does't match!",
  passwordSuccess:"Password updated successfully",
  addToCart:"Course Added to cart",
  edoctryBusiness: "Your request submitted successfully",
  userUnBlockSuccess: "An email has been successfully sent to your address. Please activate your user ID by following the instructions in the email.",
  courseExist: "The course is already in your cart."
  
},
countryJson : [
  {"txt": "Afghanistan", "value": "Afghanistan"},
  {"txt": "Albania", "value": "Albania"},
  {"txt": "Algeria", "value": "Algeria"},
  {"txt": "Andorra", "value": "Andorra"},
  {"txt": "Angola", "value": "Angola"},
  {"txt": "Antigua and Barbuda", "value": "Antigua and Barbuda"},
  {"txt": "Argentina", "value": "Argentina"},
  {"txt": "Armenia", "value": "Armenia"},
  {"txt": "Australia", "value": "Australia"},
  {"txt": "Austria", "value": "Austria"},
  {"txt": "Azerbaijan", "value": "Azerbaijan"},
  {"txt": "Bahamas", "value": "Bahamas"},
  {"txt": "Bahrain", "value": "Bahrain"},
  {"txt": "Bangladesh", "value": "Bangladesh"},
  {"txt": "Barbados", "value": "Barbados"},
  {"txt": "Belarus", "value": "Belarus"},
  {"txt": "Belgium", "value": "Belgium"},
  {"txt": "Belize", "value": "Belize"},
  {"txt": "Benin", "value": "Benin"},
  {"txt": "Bhutan", "value": "Bhutan"},
  {"txt": "Bolivia", "value": "Bolivia"},
  {"txt": "Bosnia and Herzegovina", "value": "Bosnia and Herzegovina"},
  {"txt": "Botswana", "value": "Botswana"},
  {"txt": "Brazil", "value": "Brazil"},
  {"txt": "Brunei Darussalam", "value": "Brunei Darussalam"},
  {"txt": "Bulgaria", "value": "Bulgaria"},
  {"txt": "Burkina Faso", "value": "Burkina Faso"},
  {"txt": "Burundi", "value": "Burundi"},
  {"txt": "Cabo Verde", "value": "Cabo Verde"},
  {"txt": "Cambodia", "value": "Cambodia"},
  {"txt": "Cameroon", "value": "Cameroon"},
  {"txt": "Canada", "value": "Canada"},
  {"txt": "Central African Republic", "value": "Central African Republic"},
  {"txt": "Chad", "value": "Chad"},
  {"txt": "Chile", "value": "Chile"},
  {"txt": "China", "value": "China"},
  {"txt": "Colombia", "value": "Colombia"},
  {"txt": "Comoros", "value": "Comoros"},
  {"txt": "Congo", "value": "Congo"},
  {"txt": "Costa Rica", "value": "Costa Rica"},
  {"txt": "Croatia", "value": "Croatia"},
  {"txt": "Cuba", "value": "Cuba"},
  {"txt": "Cyprus", "value": "Cyprus"},
  {"txt": "Czech Republic", "value": "Czech Republic"},
  {"txt": "Denmark", "value": "Denmark"},
  {"txt": "Djibouti", "value": "Djibouti"},
  {"txt": "Dominica", "value": "Dominica"},
  {"txt": "Dominican Republic", "value": "Dominican Republic"},
  {"txt": "Ecuador", "value": "Ecuador"},
  {"txt": "Egypt", "value": "Egypt"},
  {"txt": "El Salvador", "value": "El Salvador"},
  {"txt": "Equatorial Guinea", "value": "Equatorial Guinea"},
  {"txt": "Eritrea", "value": "Eritrea"},
  {"txt": "Estonia", "value": "Estonia"},
  {"txt": "Eswatini", "value": "Eswatini"},
  {"txt": "Ethiopia", "value": "Ethiopia"},
  {"txt": "Fiji", "value": "Fiji"},
  {"txt": "Finland", "value": "Finland"},
  {"txt": "France", "value": "France"},
  {"txt": "Gabon", "value": "Gabon"},
  {"txt": "Gambia", "value": "Gambia"},
  {"txt": "Georgia", "value": "Georgia"},
  {"txt": "Germany", "value": "Germany"},
  {"txt": "Ghana", "value": "Ghana"},
  {"txt": "Greece", "value": "Greece"},
  {"txt": "Grenada", "value": "Grenada"},
  {"txt": "Guatemala", "value": "Guatemala"},
  {"txt": "Guinea", "value": "Guinea"},
  {"txt": "Guinea-Bissau", "value": "Guinea-Bissau"},
  {"txt": "Guyana", "value": "Guyana"},
  {"txt": "Haiti", "value": "Haiti"},
  {"txt": "Honduras", "value": "Honduras"},
  {"txt": "Hungary", "value": "Hungary"},
  {"txt": "Iceland", "value": "Iceland"},
  {"txt": "India", "value": "India"},
  {"txt": "Indonesia", "value": "Indonesia"},
  {"txt": "Iran", "value": "Iran"},
  {"txt": "Iraq", "value": "Iraq"},
  {"txt": "Ireland", "value": "Ireland"},
  {"txt": "Israel", "value": "Israel"},
  {"txt": "Italy", "value": "Italy"},
  {"txt": "Jamaica", "value": "Jamaica"},
  {"txt": "Japan", "value": "Japan"},
  {"txt": "Jordan", "value": "Jordan"},
  {"txt": "Kazakhstan", "value": "Kazakhstan"},
  {"txt": "Kenya", "value": "Kenya"},
  {"txt": "Kiribati", "value": "Kiribati"},
  {"txt": "Korea, Democratic People's Republic of", "value": "Korea, Democratic People's Republic of"},
  {"txt": "Korea, Republic of", "value": "Korea, Republic of"},
  {"txt": "Kuwait", "value": "Kuwait"},
  {"txt": "Kyrgyzstan", "value": "Kyrgyzstan"},
  {"txt": "Lao People's Democratic Republic", "value": "Lao People's Democratic Republic"},
  {"txt": "Latvia", "value": "Latvia"},
  {"txt": "Lebanon", "value": "Lebanon"},
  {"txt": "Lesotho", "value": "Lesotho"},
  {"txt": "Liberia", "value": "Liberia"},
  {"txt": "Libya", "value": "Libya"},
  {"txt": "Liechtenstein", "value": "Liechtenstein"},
  {"txt": "Lithuania", "value": "Lithuania"},
  {"txt": "Luxembourg", "value": "Luxembourg"},
  {"txt": "Madagascar", "value": "Madagascar"},
  {"txt": "Malawi", "value": "Malawi"},
  {"txt": "Malaysia", "value": "Malaysia"},
  {"txt": "Maldives", "value": "Maldives"},
  {"txt": "Mali", "value": "Mali"},
  {"txt": "Malta", "value": "Malta"},
  {"txt": "Marshall Islands", "value": "Marshall Islands"},
  {"txt": "Mauritania", "value": "Mauritania"},
  {"txt": "Mauritius", "value": "Mauritius"},
  {"txt": "Mexico", "value": "Mexico"},
  {"txt": "Micronesia", "value": "Micronesia"},
  {"txt": "Moldova", "value": "Moldova"},
  {"txt": "Monaco", "value": "Monaco"},
  {"txt": "Mongolia", "value": "Mongolia"},
  {"txt": "Montenegro", "value": "Montenegro"},
  {"txt": "Morocco", "value": "Morocco"},
  {"txt": "Mozambique", "value": "Mozambique"},
  {"txt": "Myanmar", "value": "Myanmar"},
  {"txt": "Namibia", "value": "Namibia"},
  {"txt": "Nauru", "value": "Nauru"},
  {"txt": "Nepal", "value": "Nepal"},
  {"txt": "Netherlands", "value": "Netherlands"},
  {"txt": "New Zealand", "value": "New Zealand"},
  {"txt": "Nicaragua", "value": "Nicaragua"},
  {"txt": "Niger", "value": "Niger"},
  {"txt": "Nigeria", "value": "Nigeria"},
  {"txt": "North Macedonia", "value": "North Macedonia"},
  {"txt": "Norway", "value": "Norway"},
  {"txt": "Oman", "value": "Oman"},
  {"txt": "Pakistan", "value": "Pakistan"},
  {"txt": "Palau", "value": "Palau"},
  {"txt": "Panama", "value": "Panama"},
  {"txt": "Papua New Guinea", "value": "Papua New Guinea"},
  {"txt": "Paraguay", "value": "Paraguay"},
  {"txt": "Peru", "value": "Peru"},
  {"txt": "Philippines", "value": "Philippines"},
  {"txt": "Poland", "value": "Poland"},
  {"txt": "Portugal", "value": "Portugal"},
  {"txt": "Qatar", "value": "Qatar"},
  {"txt": "Romania", "value": "Romania"},
  {"txt": "Russian Federation", "value": "Russian Federation"},
  {"txt": "Rwanda", "value": "Rwanda"},
  {"txt": "Saint Kitts and Nevis", "value": "Saint Kitts and Nevis"},
  {"txt": "Saint Lucia", "value": "Saint Lucia"},
  {"txt": "Saint Vincent and the Grenadines", "value": "Saint Vincent and the Grenadines"},
  {"txt": "Samoa", "value": "Samoa"},
  {"txt": "San Marino", "value": "San Marino"},
  {"txt": "Sao Tome and Principe", "value": "Sao Tome and Principe"},
  {"txt": "Saudi Arabia", "value": "Saudi Arabia"},
  {"txt": "Senegal", "value": "Senegal"},
  {"txt": "Serbia", "value": "Serbia"},
  {"txt": "Seychelles", "value": "Seychelles"},
  {"txt": "Sierra Leone", "value": "Sierra Leone"},
  {"txt": "Singapore", "value": "Singapore"},
  {"txt": "Slovakia", "value": "Slovakia"},
  {"txt": "Slovenia", "value": "Slovenia"},
  {"txt": "Solomon Islands", "value": "Solomon Islands"},
  {"txt": "Somalia", "value": "Somalia"},
  {"txt": "South Africa", "value": "South Africa"},
  {"txt": "South Sudan", "value": "South Sudan"},
  {"txt": "Spain", "value": "Spain"},
  {"txt": "Sri Lanka", "value": "Sri Lanka"},
  {"txt": "Sudan", "value": "Sudan"},
  {"txt": "Suriname", "value": "Suriname"},
  {"txt": "Sweden", "value": "Sweden"},
  {"txt": "Switzerland", "value": "Switzerland"},
  {"txt": "Syrian Arab Republic", "value": "Syrian Arab Republic"},
  {"txt": "Tajikistan", "value": "Tajikistan"},
  {"txt": "Tanzania", "value": "Tanzania"},
  {"txt": "Thailand", "value": "Thailand"},
  {"txt": "Timor-Leste", "value": "Timor-Leste"},
  {"txt": "Togo", "value": "Togo"},
  {"txt": "Tonga", "value": "Tonga"},
  {"txt": "Trinidad and Tobago", "value": "Trinidad and Tobago"},
  {"txt": "Tunisia", "value": "Tunisia"},
  {"txt": "Turkey", "value": "Turkey"},
  {"txt": "Turkmenistan", "value": "Turkmenistan"},
  {"txt": "Tuvalu", "value": "Tuvalu"},
  {"txt": "Uganda", "value": "Uganda"},
  {"txt": "Ukraine", "value": "Ukraine"},
  {"txt": "United Arab Emirates", "value": "United Arab Emirates"},
  {"txt": "United Kingdom of Great Britain and Northern Ireland", "value": "United Kingdom of Great Britain and Northern Ireland"},
  {"txt": "United States of America", "value": "United States of America"},
  {"txt": "Uruguay", "value": "Uruguay"},
  {"txt": "Uzbekistan", "value": "Uzbekistan"},
  {"txt": "Vanuatu", "value": "Vanuatu"},
  {"txt": "Venezuela", "value": "Venezuela"},
  {"txt": "Viet Nam", "value": "Viet Nam"},
  {"txt": "Yemen", "value": "Yemen"},
  {"txt": "Zambia", "value": "Zambia"},
  {"txt": "Zimbabwe", "value": "Zimbabwe"}
]

,
payKeyConfig : {
  key_secret: "rzp_test_j01bme0LQCu7jS",
  name: "Edoctry Inc",
  currency: "INR",
  description: "Test Transaction",
  logo: "/publicContent/images/logo/png/logo-color.ico",
  CorporateAddress: "Razorpay Corporate Office"
}

}
export default ConstData; 




