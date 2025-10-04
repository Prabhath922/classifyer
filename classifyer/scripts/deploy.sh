#!/bin/bash

# Waste Classifier Mobile App - Deployment Script
# This script helps deploy the app to app stores

set -e

echo "🚀 Waste Classifier Mobile App - Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if EAS CLI is installed
check_eas_cli() {
    if ! command -v eas &> /dev/null; then
        print_error "EAS CLI is not installed. Installing..."
        npm install -g eas-cli
    else
        print_success "EAS CLI is installed"
    fi
}

# Check if user is logged in to Expo
check_expo_login() {
    if ! eas whoami &> /dev/null; then
        print_warning "Not logged in to Expo. Please log in:"
        eas login
    else
        print_success "Logged in to Expo"
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    npm install
    print_success "Dependencies installed"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    if npm test -- --watchAll=false --passWithNoTests; then
        print_success "Tests passed"
    else
        print_warning "Some tests failed, but continuing..."
    fi
}

# Build for development
build_development() {
    print_status "Building for development..."
    eas build --platform all --profile development
    print_success "Development build completed"
}

# Build for preview
build_preview() {
    print_status "Building for preview..."
    eas build --platform all --profile preview
    print_success "Preview build completed"
}

# Build for production
build_production() {
    print_status "Building for production..."
    eas build --platform all --profile production
    print_success "Production build completed"
}

# Submit to app stores
submit_to_stores() {
    print_status "Submitting to app stores..."
    
    # Submit to iOS App Store
    print_status "Submitting to iOS App Store..."
    eas submit --platform ios --profile production
    
    # Submit to Google Play Store
    print_status "Submitting to Google Play Store..."
    eas submit --platform android --profile production
    
    print_success "Submitted to both app stores"
}

# Update app with over-the-air update
ota_update() {
    print_status "Publishing over-the-air update..."
    read -p "Enter update message: " update_message
    eas update --branch production --message "$update_message"
    print_success "OTA update published"
}

# Generate app store assets
generate_assets() {
    print_status "Generating app store assets..."
    node scripts/generate-assets.js
    print_success "Assets generated"
}

# Main menu
show_menu() {
    echo ""
    echo "Select an option:"
    echo "1) Install dependencies"
    echo "2) Run tests"
    echo "3) Generate assets"
    echo "4) Build development version"
    echo "5) Build preview version"
    echo "6) Build production version"
    echo "7) Submit to app stores"
    echo "8) Publish OTA update"
    echo "9) Full deployment (build + submit)"
    echo "0) Exit"
    echo ""
}

# Full deployment process
full_deployment() {
    print_status "Starting full deployment process..."
    
    check_eas_cli
    check_expo_login
    install_dependencies
    run_tests
    generate_assets
    build_production
    submit_to_stores
    
    print_success "Full deployment completed! 🎉"
}

# Main script logic
main() {
    # Check prerequisites
    check_eas_cli
    check_expo_login
    
    while true; do
        show_menu
        read -p "Enter your choice (0-9): " choice
        
        case $choice in
            1)
                install_dependencies
                ;;
            2)
                run_tests
                ;;
            3)
                generate_assets
                ;;
            4)
                build_development
                ;;
            5)
                build_preview
                ;;
            6)
                build_production
                ;;
            7)
                submit_to_stores
                ;;
            8)
                ota_update
                ;;
            9)
                full_deployment
                ;;
            0)
                print_status "Goodbye! 👋"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please try again."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main "$@"
