
export default class AppUtils
{
    static sectionIdToTitle = (sectionId) =>
    {
        switch (parseInt(sectionId))
        {
            case 1 :
                return 'القسم الرجالي';
            case 2 :
                return 'القسم النسوي / الهيئة الادارية';
            case 3 :
                return 'القسم النسوي / الهيئة العلمية';
            case 4 :
                return 'المنتدى الطلابي / المرحلة التمهيدية';
            case 5 :
                return 'المنتدى الطلابي / مقدمات اولى';
            case 6 :
                return 'المنتدى الطلابي / مقدمات ثانية';
            case 7 :
                return 'المنتدى الطلابي / مقدمات ثالثة';
            default :
                return "المنتدى غير معروف";
        }
    }
}