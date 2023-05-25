'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('products', products1);
        await queryInterface.bulkInsert('products', products2);
        await queryInterface.bulkInsert('products', products3);
        await queryInterface.bulkInsert('products', products4);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here
         *
         * Example:
         * await queryInterfacebulkDelete('People', null, {});
         */
    },
};

const products1 = [{
        id: 1,
        product_name: "Nồi Chiên Không Dầu Philips HD9200/90 - Hàng Chính Hãng",
        full_price: 2186000,
        image_path: "sp7",
        description: null,
        product_type: 1
    },
    {
        id: 2,
        product_name: 'Máy hút mùi gắn tường Hafele HH-WI60B 53981173 - Hàng Chính Hãngg',
        full_price: '9572400',
        image_path: "sp8",
        description: null,
        product_type: 1
    },
    {
        id: 3,
        product_name: 'Robot hút bụi lau nhà thông minh Xiaomi Mi Robot Vacuum-Mop P SKV4110GL màu trắng - Hàng Chính Hãng',
        full_price: '7490000',
        image_path: "sp9",
        description: null,
        product_type: 1
    },
    {
        id: 4,
        product_name: 'Quạt điều hòa Không Khí Comet CM8838 175W (60L) - Hàng Chính Hãng',
        full_price: '8470100',
        image_path: "sp10",
        description: null,
        product_type: 1
    },
    {
        id: 5,
        product_name: 'Máy hút bụi Hitachi CV-SC22 - Hàng chính hãng',
        full_price: '56490000',
        image_path: "sp11",
        description: null,
        product_type: 1
    },
    {
        id: 6,
        product_name: 'Máy Lọc Nước AO Smith G2 - Hàng Chính Hãng',
        full_price: '11000000',
        image_path: "sp12",
        description: null,
        product_type: 1
    },
    {
        id: 7,
        product_name: 'NỒI CƠM ĐIỆN CAO TẦNG CUCKOO CRP-DHXB0610FS - HÀNG CHÍNH HÃNG',
        full_price: '11880000',
        image_path: "sp13",
        description: null,
        product_type: 1
    },
    {
        id: 8,
        product_name: 'Lò Nướng CATA ME 611 DI - Hàng Chính Hãng',
        full_price: '11950000',
        image_path: "sp14",
        description: null,
        product_type: 1
    },
    {
        id: 9,
        product_name: 'Máy Lọc Nước Nóng Lạnh CNC CNC915 - Hàng Chính Hãng',
        full_price: '10945200',
        image_path: "sp15",
        description: null,
        product_type: 1
    },
];

const products2 = [{
        id: 10,
        product_name: 'Laptop Asus ExpertBook L1400CDA-EK0490T (AMD R3-3250U/ 4GB DDR4/ 256GB SSD/ Win10) - Hàng Chính Hãng',
        full_price: '14880000',
        image_path: "sp1",
        description: null,
        product_type: 2
    },
    {
        id: 11,
        product_name: 'Máy cắt đa năng Brother SDX1200 - Hàng chính hãng',
        full_price: '14759000',
        image_path: "sp2",
        description: null,
        product_type: 2
    },
    {
        id: 12,
        product_name: 'Đồng Hồ Thông Minh Apple Watch Series 6 LTE GPS + Cellular Stainless Steel Case With Milanese Loop (Viền Thép & Dây Thép) - Hàng Chính HãngVNA',
        full_price: '19990000',
        image_path: "sp3",
        description: null,
        product_type: 2
    },
    {
        id: 13,
        product_name: 'Điện Thoại iPhone 14 Pro Max  256GB - Hàng Chính Hãng',
        full_price: '32990000',
        image_path: "sp4",
        description: null,
        product_type: 2
    },
    {
        id: 14,
        product_name: 'Máy Ảnh Sony Cyber-Shot DSC-RX10 III - Hàng Chính Hãng',
        full_price: '56490000',
        image_path: "sp5",
        description: null,
        product_type: 2
    },
    {
        id: 15,
        product_name: 'Máy ảnh Sony Alpha A7S III | Chính hãng',
        full_price: '82990000',
        image_path: "sp6",
        description: null,
        product_type: 2
    },
];

const products3 = [{
        id: 16,
        product_name: 'Nhẫn Lộc Phúc Fine Jewelry K4BQFS0382AR Vàng Đính Kim Cương',
        full_price: '158000000',
        image_path: "sp16",
        description: null,
        product_type: 3
    },
    {
        id: 17,
        product_name: 'DELVAUX22 mùa xuân và mùa hè mới túi xách nữ messenger túi đeo vai sang trọng túi xách nữ túi xách trung bình Món quà sinh nhật rực rỡ cho bạn gái latte color PM',
        full_price: '185902000',
        image_path: "sp17",
        description: null,
        product_type: 3
    },
    {
        id: 18,
        product_name: "CHANEL Chanel Ladies Flip Bag New Maxi Classic Handbag Fashion and Beautiful Pre-full_price Love Don't Wait Black",
        full_price: '262327000',
        image_path: "sp18",
        description: null,
        product_type: 3
    },
    {
        id: 19,
        product_name: 'Cartier Cartier Vòng cổ nữ sang trọng vàng 18K dát vàng kim cương xương rồng Mặt dây chuyền Vòng cổ tinh tế và thanh lịch Phụ kiện quyến rũ',
        full_price: '519827119',
        image_path: "sp19",
        description: null,
        product_type: 3
    },
    {
        id: 20,
        product_name: "Đủ Paris GUCCI Gucci Spring  Summer 22 Women's GG Marmont Series Crocodile Leather Mini Handbag 547260 EV40T 3120 Green One Size",
        full_price: '542597000',
        image_path: "sp20",
        description: null,
        product_type: 3
    },
    {
        id: 21,
        product_name: 'Đủ Paris GUCCI Gucci 22 nữ mùa xuân và mùa hè GG Marmont dòng túi đeo vai nhỏ bằng da cá sấu',
        full_price: '63522600',
        image_path: "sp21",
        description: null,
        product_type: 3
    },
    {
        id: 22,
        product_name: 'HERMES Túi xách nữ Hermes màu tím bạch kim túi da khóa kim loại thời trang và màu tím thanh lịch',
        full_price: '854738000',
        image_path: "sp22",
        description: null,
        product_type: 3
    },
    {
        id: 23,
        product_name: 'Hublot Big Bang Sang Bleu II King Gold Blue Pave 45mm',
        full_price: '1590000000',
        image_path: "sp23",
        description: null,
        product_type: 3
    },
    {
        id: 24,
        product_name: 'Bộ trang sức Kim cương Vàng trắng 14K PNJ 00703-02002',
        full_price: '1650323000',
        image_path: "sp24",
        description: null,
        product_type: 3
    },
    {
        id: 25,
        product_name: "[Nhận dạng xác thực] Đồng hồ nam Rolex Cosmograph Daytona Chronograph 18K Gold Automatic Mechanical Quartz 116508 Ludi Men's Watch",
        full_price: '2147483000',
        image_path: "sp25",
        description: null,
        product_type: 3
    },
    {
        id: 26,
        product_name: 'đồng hồ Rolex Submariner Automatic Chronometer Diamond Silver Dial',
        full_price: '5499000000',
        image_path: "sp26",
        description: null,
        product_type: 3
    },
];

const products4 = [{
        id: 27,
        product_name: 'Bí ẩn của nước biển xanh mạ vàng sáng bóng tinh chất 150ml nước tinh chất đường sáng tinh tế dưỡng ẩm nuôi dưỡng sửa chữa sáng da',
        full_price: '8541000',
        image_path: "sp27",
        description: null,
        product_type: 4
    },
    {
        id: 28,
        product_name: 'Nước Hoa Tom Ford Tobacco Vanille Eau De Parfum 100ml',
        full_price: '10500000',
        image_path: "sp28",
        description: null,
        product_type: 4
    },
    {
        id: 29,
        product_name: 'Bộ 3 dược mỹ phẩm chăm sóc da chống lão hóa Caviar of Switzerland',
        full_price: '9044000',
        image_path: "sp29",
        description: null,
        product_type: 4
    },
    {
        id: 30,
        product_name: 'Nước Hoa Nữ Ramon Molvizar Art & Silver Vàng Trắng Đính Đá Swarovski Trắng 75ml',
        full_price: '12000000',
        image_path: "sp30",
        description: null,
        product_type: 4
    },
    {
        id: 31,
        product_name: 'Tinh chất phục hồi cô đặc Sea Blue Mystery 50ml Tinh chất phục hồi mạnh mẽ chống oxy hóa tuyệt vời Sản phẩm chăm sóc da Lamer',
        full_price: '15898000',
        image_path: "sp31",
        description: null,
        product_type: 4
    },
    {
        id: 32,
        product_name: 'Truffle Infusion Brightening Face Lift Cream (Gold Elements)',
        full_price: '15300000',
        image_path: "sp32",
        description: null,
        product_type: 4
    },
    {
        id: 33,
        product_name: 'Bộ Set Tái Sinh Da Su m37 Losec Summa Elixir Special Set 12 Sản Phẩm',
        full_price: '24000000',
        image_path: "sp33",
        description: null,
        product_type: 4
    },
    {
        id: 34,
        product_name: 'Mặt Nạ Làm Săn Chắc Da - Platinum Instant Firming Mask Kedma',
        full_price: '19500000',
        image_path: "sp34",
        description: null,
        product_type: 4
    },
    {
        id: 35,
        product_name: 'Mặt Nạ Nhiệt Black Pearl Thermal Mask - Có Nguồn Gốc Từ Biển Chết - Xuất Xứ Israel - Hỗ Trợ Điều trị cho làn da của bạn nhẹ nhàng, mịn màng hơn và trẻ trung hơn',
        full_price: '21760000',
        image_path: "sp35",
        description: null,
        product_type: 4
    },
    {
        id: 36,
        product_name: 'Mặt nạ tinh chất vàng 24K chắc khỏe da Botanifique – gold era-24k facial mask',
        full_price: '21950000',
        image_path: "sp36",
        description: null,
        product_type: 4
    },
];